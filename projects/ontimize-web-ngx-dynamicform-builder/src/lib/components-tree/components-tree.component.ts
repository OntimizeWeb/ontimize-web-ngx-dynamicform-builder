import { CdkDragDrop, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import * as uuid from 'uuid';

import { AppMenuService } from '../services/app-menu.service';
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

  @Output() public onDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() public onMoveComponent: EventEmitter<any> = new EventEmitter();

  protected formDefinitionChange = new Subject<any>();
  protected componentsInfoChange = new Subject<any>();

  public dataSource: MatTreeFlatDataSource<ComponentNode, ComponentFlatNode>;
  public treeControl: FlatTreeControl<ComponentFlatNode>;
  protected treeFlattener: MatTreeFlattener<ComponentNode, ComponentFlatNode>;
  protected expandedNodesSet = new Set<string>();

  protected dropListActive: boolean;
  protected dragging: boolean;
  protected expandTimeout: any;
  protected expandDelay = 200;

  uId: any;

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
    protected appMenuService: AppMenuService,
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
  hasChild = (_: number, _nodeData: ComponentFlatNode) => _nodeData.expandable;

  rebuildTreeForData(data: any) {
    this.updateExpandedTreeNodes(this.treeControl, this.expandedNodesSet);
    this.dataSource.data = data;
    this.deleteMissingExpandedNodes(this.treeControl, this.expandedNodesSet);
    this.expandNodesByAttr(this.treeControl.dataNodes, this.expandedNodesSet);
  }

  drop(event: CdkDragDrop<string[]>) {
    // ignore drops outside of the tree
    if (!event.isPointerOverContainer) {
      return;
    }

    // construct a list of visible nodes, this will match the DOM.
    // the cdkDragDrop event.currentIndex gives with visible nodes.
    // it calls rememberExpandedTreeNodes to persist expand state
    const visibleNodes = this.visibleNodes();

    // deep clone the data source so we can mutate it
    const changedData: ComponentNode[] = JSON.parse(JSON.stringify(this.dataSource.data));

    // remove the node from its old place
    const node: ComponentNode = event.item.data;
    const siblings: ComponentNode[] = this.findNodeSiblings(changedData, node.uId);
    const previousIndex = siblings.findIndex(n => n.uId === node.uId);
    const nodeToInsert: ComponentNode = siblings.splice(previousIndex, 1)[0];

    // determine where to insert the node
    const nodeAtDest = visibleNodes[event.currentIndex];
    if (nodeAtDest.uId === nodeToInsert.uId) {
      return;
    }

    const nodeFlatNode = this.treeControl.dataNodes.find(n => node.uId === n.uId);
    const originParentFlatNode: ComponentFlatNode = this.getParentNode(nodeFlatNode);

    // determine drop index relative to destination array
    let relativeIndex = event.currentIndex; // default if no parent
    const nodeAtDestFlatNode = this.treeControl.dataNodes.find(n => nodeAtDest.uId === n.uId);

    const destinationParentFlatNode: ComponentFlatNode = this.getParentNode(nodeAtDestFlatNode);
    if (destinationParentFlatNode) {
      const parentIndex = visibleNodes.findIndex(n => n.uId === destinationParentFlatNode.uId) + 1;
      relativeIndex = event.currentIndex - parentIndex;
    } else {
      const expandedNodesAttrs = new Set<string>();
      this.updateExpandedTreeNodes(this.treeControl, expandedNodesAttrs);

      visibleNodes.forEach((visibleNode, index) => {
        if (index < relativeIndex && expandedNodesAttrs.has(visibleNode.attr)) {
          const diff = (originParentFlatNode && originParentFlatNode.attr === visibleNode.attr) ? 1 : 0;
          relativeIndex -= (visibleNode.children.length - diff);
        }
      });
    }
    // insert node 
    const newSiblings = this.findNodeSiblings(changedData, nodeAtDest.uId);
    if (!newSiblings) {
      return;
    }

    newSiblings.splice(relativeIndex, 0, nodeToInsert);

    // rebuild tree with mutated data
    // this.rebuildTreeForData(changedData);

    this.triggerMoveEvent(
      changedData,
      originParentFlatNode,
      destinationParentFlatNode,
      previousIndex,
      relativeIndex
    );
  }

  dragStart(event: CdkDragStart<any>) {
    this.dragging = true;
  }

  dragEnd(event: CdkDragEnd<any>) {
    this.dragging = false;
  }


  dragHover(node: ComponentFlatNode) {
    if (!this.dragging) {
      return;
    }
    if (node.expandable && node.empty) {
      node.hover = true;
    }
    // possible feature that is not currently working-> Expand node when hovering it
    // if (node.expandable && !this.treeControl.isExpanded(node)) {
    //   clearTimeout(this.expandTimeout);
    //   this.expandTimeout = setTimeout(() => {
    //     this.treeControl.expand(node);
    //   }, this.expandDelay);
    // }
  }

  dragHoverEnd(node: ComponentFlatNode) {
    if (!this.dragging) {
      return;
    }
    if (node.expandable && node.empty && node.hover) {
      node.hover = false;
    }
    // possible feature that is not currently working-> Expand node when hovering it
    // if (this.dragging) {
    //   clearTimeout(this.expandTimeout);
    // }
  }

  deleteNode(arg: any) {
    this.onDeleteComponent.emit(arg);
  }

  private getComponentsInfo() {
    this.appMenuService.getMenu().subscribe((items: any) => {
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
      const destinationParent: ComponentNode = destinationFlatNode ? changedData.find(el => el.uId === destinationFlatNode.uId) : null;
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
}
