import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import * as uuid from 'uuid';

import { AppDataService } from '../services/app-data.service';
import { ODynamicFormBuidlerUtils } from '../utils/o-dynamic-form-builder-utils';
import { ComponentFlatNode, ComponentNode } from './component-node';
import { ComponentsTreeDatabase } from './components-tree.datasource';

@Component({
  selector: 'components-tree',
  templateUrl: './components-tree.component.html',
  styleUrls: ['./components-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.components-tree]': 'true'
  },
  providers: [ComponentsTreeDatabase]
})
export class ComponentsTreeComponent {

  @Output() public onAddComponent: EventEmitter<any> = new EventEmitter();
  @Output() public onDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() public onMoveComponent: EventEmitter<any> = new EventEmitter();
  @Output() public onDrop: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public componentSelected: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public onChangeComponentSelector: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onAddPredefinedLayout: EventEmitter<any> = new EventEmitter<any>();

  protected formDefinitionChange = new Subject<any>();
  protected componentsInfoChange = new Subject<any>();

  public dataSource: MatTreeFlatDataSource<ComponentNode, ComponentFlatNode>;
  public treeControl: FlatTreeControl<ComponentFlatNode>;
  protected treeFlattener: MatTreeFlattener<ComponentNode, ComponentFlatNode>;
  protected expandedNodesSet = new Set<string>();

  protected dropListActive: boolean;
  public dragging: boolean;
  protected expandTimeout: any;
  protected expandDelay = 200;

  uId: any;

  protected pendingSelectedAttr;

  @Input('form-definition')
  set formDefinition(value: any) {
    if (value != null) {
      const componentsArray = (value && value.components) ? value.components : [];
      const copy = JSON.parse(JSON.stringify(componentsArray));
      this.formDefinitionChange.next(copy);
    }
  }

  constructor(
    protected injector: Injector,
    protected appDataService: AppDataService,
    protected database: ComponentsTreeDatabase
  ) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<ComponentFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => this.rebuildTreeForData(data));

    this.uId = uuid.v4();

    combineLatest([this.formDefinitionChange.asObservable(), this.componentsInfoChange.asObservable()]).subscribe(results => {
      const data = results[0];
      this.setComponentsDisplayData(data, results[1]);
      this.database.initialize(data);
    });

    this.getComponentsInfo();
  }

  transformer = (node: ComponentNode, level: number) => new ComponentFlatNode(node, level);
  private _getLevel = (node: ComponentFlatNode) => node.level;
  private _isExpandable = (node: ComponentFlatNode) => node.expandable;
  private _getChildren = (node: ComponentNode): Observable<ComponentNode[]> => of(node.children);
  // hasChild = (_: number, _nodeData: ComponentFlatNode) => _nodeData.expandable;

  rebuildTreeForData(data: ComponentNode[]) {
    this.updateExpandedTreeNodes(this.treeControl, this.expandedNodesSet);
    this.dataSource.data = data;
    this.deleteMissingExpandedNodes(this.treeControl, this.expandedNodesSet);
    this.expandNodesByAttr(this.treeControl.dataNodes, this.expandedNodesSet);
    if (this.pendingSelectedAttr != null) {
      this.setSelectedNodeByAttr(this.pendingSelectedAttr);
      this.pendingSelectedAttr = null;
    }
  }

  private getDestinationNode(
    index: number,
    visibleNodes: ComponentNode[],
    expandedNodesAttrs: Set<string>,
    originParent: ComponentFlatNode): ComponentNode {
    let nodeAtDest = visibleNodes[index];
    if (!nodeAtDest || !nodeAtDest.children || nodeAtDest.children.length === 0 || !expandedNodesAttrs.has(nodeAtDest.attr)) {
      return nodeAtDest;
    }
    const originParentAttr = originParent ? originParent.attr : null;
    if (nodeAtDest.attr !== originParentAttr) {
      nodeAtDest = visibleNodes[index + 1];
    }
    return nodeAtDest;
  }

  private calculateRelativeIndex(
    initialValue: number,
    nodeUId: string,
    visibleNodes: ComponentNode[],
    expandedNodesAttrs: Set<string>,
    originParent: ComponentFlatNode,
    destinationParent: ComponentFlatNode): number {

    let result = initialValue;
    if (destinationParent) {
      const parentIndex = visibleNodes.findIndex(n => n.uId === destinationParent.uId);
      const nodeIndex = visibleNodes.findIndex(n => n.uId === nodeUId);
      const sameLevel = this.areAtSameLevel(originParent, destinationParent) || nodeIndex > initialValue;
      result = initialValue - parentIndex - (sameLevel ? 1 : 0);
    } else {
      visibleNodes.forEach((visibleNode, index) => {
        if (index < result && expandedNodesAttrs.has(visibleNode.attr)) {
          const diff = (originParent && originParent.attr === visibleNode.attr) ? 1 : 0;
          result -= (visibleNode.children.length - diff);
        }
      });
    }
    return result;
  }

  private dropNewNode(node: ComponentFlatNode, destinationParent: ComponentFlatNode, index: number) {
    delete node['new'];

    this.onAddComponent.emit({
      component: node,
      parent: destinationParent,
      index: index
    });

    this.onDrop.emit();
    this.componentSelected.emit((node as any).configuredInputs.attr);
  }

  drop(event: CdkDragDrop<string[]>) {
    // ignore drops outside of the tree
    if (!event.isPointerOverContainer) {
      return;
    }
    const expandedNodesAttrs = new Set<string>();
    this.updateExpandedTreeNodes(this.treeControl, expandedNodesAttrs);

    const node: ComponentFlatNode = event.item.data;
    const originParent: ComponentFlatNode = this.getParentNode(node);

    // construct a list of visible nodes, this will match the DOM.
    // the cdkDragDrop event.currentIndex gives with visible nodes.
    // it calls rememberExpandedTreeNodes to persist expand state
    const visibleNodes = this.visibleNodes();

    // determine where to insert the node
    const nodeAtDest = this.getDestinationNode(event.currentIndex, visibleNodes, expandedNodesAttrs, originParent);
    let nodeAtDestUId = nodeAtDest && nodeAtDest.uId;
    const nodeAtDestFlat: ComponentFlatNode = nodeAtDest && this.treeControl.dataNodes.find(n => nodeAtDest.uId === n.uId);
    let destinationParent: ComponentFlatNode = nodeAtDestFlat && this.getParentNode(nodeAtDestFlat);
    if (nodeAtDestFlat && nodeAtDestFlat.hover && nodeAtDestFlat.empty) {
      destinationParent = nodeAtDestFlat;
      nodeAtDestUId = null;
    }

    // determine drop index relative to destination array
    const relativeIndex = this.calculateRelativeIndex(event.currentIndex, node.uId, visibleNodes, expandedNodesAttrs, originParent, destinationParent);

    if ((node as any).new) {
      this.dropNewNode(node, destinationParent, relativeIndex);
      return;
    }

    if ((node as any).action) {
      this.onAddPredefinedLayout.emit({
        mode: 'new',
        component: node,
        parent: destinationParent,
        index: relativeIndex
      });
      this.onDrop.emit();
      return;
    }


    // deep clone the data source so we can mutate it
    const changedData: ComponentNode[] = JSON.parse(JSON.stringify(this.dataSource.data));

    // remove the node from its old place
    const siblings: ComponentNode[] = this.findNodeSiblings(changedData, node.uId);
    const previousIndex = siblings.findIndex(n => n.uId === node.uId);
    const nodeToInsert: ComponentNode = siblings.splice(previousIndex, 1)[0];

    if (nodeAtDestUId === nodeToInsert.uId) {
      return;
    }

    // insert node 
    const newSiblings = nodeAtDestUId ? this.findNodeSiblings(changedData, nodeAtDestUId) : nodeAtDest.children;
    if (!newSiblings) {
      return;
    }
    newSiblings.splice(relativeIndex, 0, nodeToInsert);

    // rebuild tree with mutated data
    // this.rebuildTreeForData(changedData);

    this.triggerMoveEvent(
      changedData,
      originParent,
      destinationParent,
      previousIndex,
      relativeIndex
    );
  }

  private triggerMoveEvent(
    changedData: ComponentNode[],
    originFlatNode: ComponentFlatNode,
    destinationFlatNode: ComponentFlatNode,
    previousIndex: number,
    relativeIndex: number
  ) {
    const originParent: ComponentNode = originFlatNode ? changedData.find(el => el.uId === originFlatNode.uId) : null;

    if (this.areAtSameLevel(originFlatNode, destinationFlatNode)) {
      const attrsArray = originParent ? originParent.children : changedData;
      const orderedAttrs = attrsArray.map(child => child.attr);
      this.onMoveComponent.emit({
        type: 'move',
        parent: originParent ? originParent.data : null,
        attrs: orderedAttrs
      });
    } else {
      const destinationParent = destinationFlatNode ? this.searchInArray(destinationFlatNode.uId, changedData) : null;
      this.onMoveComponent.emit({
        type: 'transfer',
        previousContainer: originParent ? originParent.data : null,
        container: destinationParent ? destinationParent.data : null,
        previousIndex: previousIndex,
        currentIndex: relativeIndex
      });
    }
  }

  private areAtSameLevel(a: ComponentFlatNode, b: ComponentFlatNode) {
    return a === b || (a && b && a.uId === b.uId);
  }

  private searchInArray(uId: string, array: ComponentNode[]) {
    return ODynamicFormBuidlerUtils.searchElement(uId, array, (comp: ComponentNode) => comp.uId);
  }

  dragStart(event: CdkDragStart<any>) {
    this.componentSelected.emit(null);
    this.dragging = true;
  }

  dragEnd() {
    this.dragging = false;
  }

  dragHover(node: ComponentFlatNode) {
    node.hover = true;
    // possible feature that is not currently working-> Expand node when hovering it
    // if (node.expandable && !this.treeControl.isExpanded(node)) {
    //   clearTimeout(this.expandTimeout);
    //   this.expandTimeout = setTimeout(() => {
    //     this.treeControl.expand(node);
    //   }, this.expandDelay);
    // }
  }

  dragHoverEnd(node: ComponentFlatNode) {
    node.hover = false;
    // possible feature that is not currently working-> Expand node when hovering it
    // if (this.dragging) {
    //   clearTimeout(this.expandTimeout);
    // }
  }

  deleteNode(attr: string) {
    this.onDeleteComponent.emit(attr);
  }

  changeComponentSelector(attr: string) {
    this.onChangeComponentSelector.emit(attr);
  }

  addPredefinedLayout(attr: string) {
    this.onAddPredefinedLayout.emit({
      mode: 'existingContainer',
      attr: attr
    });
  }

  clickLeaf(node: ComponentFlatNode) {
    this.treeControl.dataNodes.forEach(dataNode => dataNode.selected = false);
    node.selected = true;
    this.componentSelected.emit(node.attr);
  }

  setSelectedNodeByAttr(attr: string) {
    if (!this.treeControl.dataNodes.find(dataNode => dataNode.attr === attr)) {
      this.pendingSelectedAttr = attr;
    }
    this.treeControl.dataNodes.forEach(dataNode => dataNode.selected = (dataNode.attr === attr));
    // expand parent nodes in case where collapsed
    const attrs = new Set<string>();
    attrs.add(attr);
    this.expandNodesByAttr(this.treeControl.dataNodes, attrs);
  }

  private getComponentsInfo() {
    this.appDataService.getMenu().subscribe((items: any) => {
      const allComponentsInfo = {};
      const allComponentsArray = items.reduce((a, b) => {
        a.push(...(b.elements || []));
        return a;
      }, []);
      allComponentsArray.forEach(comp => {
        allComponentsInfo[comp['ontimize-component']] = comp;
      });
      this.componentsInfoChange.next(allComponentsInfo);
    });
  }

  private setComponentsDisplayData(data: any[], allComponentsInfo: any) {
    data
      .filter(item => allComponentsInfo.hasOwnProperty(item['ontimize-directive']))
      .forEach(item => {
        item.display = allComponentsInfo[item['ontimize-directive']];
        this.setComponentsDisplayData(item.children || [], allComponentsInfo);
      });
  }

  /**
   * This constructs an array of nodes that matches the DOM,
   * and calls rememberExpandedTreeNodes to persist expand state
   */
  private visibleNodes(): ComponentNode[] {
    this.updateExpandedTreeNodes(this.treeControl, this.expandedNodesSet);
    const result: ComponentNode[] = [];
    this.dataSource.data.forEach(node => {
      this.addExpandedChildren(node, this.expandedNodesSet, result);
    });
    return result;
  }

  private addExpandedChildren(
    node: ComponentNode,
    expanded: Set<string>,
    array: ComponentNode[]
  ) {
    array.push(node);
    if (expanded.has(node.attr)) {
      node.children.forEach(child => this.addExpandedChildren(child, expanded, array));
    }
  }

  private updateExpandedTreeNodes(
    treeControl: FlatTreeControl<ComponentFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    expandedNodeSet.clear();
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach((node) => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          // capture latest expanded state
          expandedNodeSet.add(node.attr);
        }
      });
    }
  }

  private deleteMissingExpandedNodes(
    treeControl: FlatTreeControl<ComponentFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach((nodeAttr) => {
        // maintain expanded node state
        if (!treeControl.dataNodes.find((n) => n.attr === nodeAttr)) {
          // if the tree doesn't have the previous node, remove it from the expanded list
          expandedNodeSet.delete(nodeAttr);
        }
      });
    }
  }

  private expandNodesByAttr(flatNodes: ComponentFlatNode[], attrs: Set<string>) {
    flatNodes.forEach((node) => {
      if (attrs.has(node.attr)) {
        this.treeControl.expand(node);
        let parent = this.getParentNode(node);
        while (parent) {
          this.treeControl.expand(parent);
          parent = this.getParentNode(parent);
        }
      }
    });
  }

  // recursive find function to find siblings of node
  private findNodeSiblings(arr: ComponentNode[], id: string): ComponentNode[] {
    let result: ComponentNode[], subResult: ComponentNode[];
    arr.forEach(item => {
      if (item.uId === id) {
        result = arr;
      } else if (item.children) {
        subResult = this.findNodeSiblings(item.children, id);
        if (subResult) {
          result = subResult;
        }
      }
    });
    return result;
  }

  private getParentNode(node: ComponentFlatNode): ComponentFlatNode {
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

}
