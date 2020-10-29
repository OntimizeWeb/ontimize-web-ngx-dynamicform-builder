import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material';
import { DialogService } from 'ontimize-web-ngx';
import { merge, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as uuid from 'uuid';

import { AppMenuService } from '../services/app-menu.service';

@Component({
  selector: 'components-tree',
  templateUrl: './components-tree.component.html',
  styleUrls: ['./components-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.components-tree]': 'true'
  }
})
export class ComponentsTreeComponent {

  @Output() public onDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() public onMoveComponent: EventEmitter<any> = new EventEmitter();

  dataChange = new Subject<void>();
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource: TreeDataSource;

  allComponentsInfo: any = {};
  uId: any;

  @Input('form-definition')
  set formDefinition(value: any) {
    const componentsArray = (value && value.components) ? value.components : [];
    const copy = JSON.parse(JSON.stringify(componentsArray));
    this.dataSource.data = copy;
    this.dataChange.next();
  }

  // protected dialogService: DialogService;

  constructor(
    protected injector: Injector,
    appMenuService: AppMenuService
  ) {
    // this.dialogService = this.injector.get(DialogService);

    this.dataSource = new TreeDataSource(this);
    appMenuService.getMenu().subscribe((items: any) => {
      const allComponentsArray = items.reduce((a, b) => {
        a.push(...(b.elements || []));
        return a;
      }, []);
      allComponentsArray.forEach(comp => {
        this.allComponentsInfo[comp['ontimize-component']] = comp;
      });
      this.dataChange.next();
    });

    this.uId = uuid.v4();
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  isLayoutNode(node: any): boolean {
    return node['ontimize-directive'] === 'o-row' || node['ontimize-directive'] === 'o-column';
  }

  dragging: boolean;
  expandTimeout: any;
  expandDelay = 500;

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      if (event.previousIndex !== event.currentIndex) {
        const orderedAttrs = event.container.data.map(child => child.attr);
        this.onMoveComponent.emit({
          type: 'move',
          // parent: args.parent,
          attrs: orderedAttrs
        });
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dragStart() {
    this.dragging = true;
  }

  dragEnd() {
    this.dragging = false;
  }

  dragHover(node: any) {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
      this.expandTimeout = setTimeout(() => {
        this.treeControl.expand(node);
      }, this.expandDelay);
    }
  }

  dragHoverEnd() {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
    }
  }

  deleteNode(arg: any) {
    // this.dialogService.confirm('CONFIRM', 'MESSAGES.CONFIRM_DELETE').then(res => {
    //   if (res === true) {
    this.onDeleteComponent.emit(arg);
    //     }
    //   });
  }

  get connectedDropListIds(): string[] {
    return this.dataSource.allUids;
  }
}

class TreeDataSource extends MatTreeNestedDataSource<any>{
  allUids: any[];


  constructor(
    private tree: ComponentsTreeComponent
  ) {
    super();
  }
  connect(): Observable<any[]> {
    const displayDataChanges: any[] = [
      this.tree.dataChange
    ];

    return merge(...displayDataChanges).pipe(map((x: any) => {
      this.setIcons(this.data);
      const allUIds: string[] = [];
      this.setUids(this.data, allUIds);
      allUIds.reverse();
      this.allUids = allUIds;
      return this.data;
    }));
  }

  private setIcons(array: any[]) {
    array
      .filter(item => this.tree.allComponentsInfo.hasOwnProperty(item['ontimize-directive']))
      .forEach(item => {
        item.display = this.tree.allComponentsInfo[item['ontimize-directive']];
        this.setIcons(item.children || []);
      });
  }

  private setUids(array: any[], allUIds: string[]) {
    array
      .filter(item => item['ontimize-directive'] === 'o-row' || item['ontimize-directive'] === 'o-column')
      .forEach(item => {
        item.uId = uuid.v4();
        allUIds.push(item.uId);
        this.setUids(item.children || [], allUIds);
        item.connectedDropListIds = item.children.map(child => child.uId);
      });
    this.allUids.reverse();
  }
}
