import {
  Component,
  TemplateRef,
  ContentChild,
  ContentChildren,
  QueryList,
  HostBinding
} from '@angular/core';

import { TreeListDefault } from './tree-list.class';
import { Type } from '../../utils';

@Component({
  selector: 'tree-grid',
  inputs: [
    'treeGrid: tree-grid',
    'gridType: grid-type',
    'gridCols: grid-columns',
    'treeGridCols: tree-grid-columns',
    'id: node-id'
  ],
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss']
})

export class TreeGridComponent {
  @ContentChild(TemplateRef)
  header: QueryList<TemplateRef<any>>;

  @ContentChildren(TemplateRef)
  contentTpls: QueryList<TemplateRef<any>>;

  @HostBinding('class')
  gridType: string = 'grid';

  gridCols: number = 3;
  treeGridCols: number = 3;
  treeGrid: TreeListDefault;
  head: Array<any>;
  nodes: Array<any>;
  elements: Array<any>;
  id: string;
  closed: boolean = true;

  needsDT: boolean = false;
  needsDD: boolean = false;

  // constructor() {
  // }

  ngAfterContentInit() {
    this.update();
    if (!!this.treeGrid.update) {
      this.treeGrid.update.subscribe(() => this.update());
    }
  }

  update() {
    if (!this.treeGrid.header) {
      this.treeGrid.header = this.header;
    }
    if (!this.treeGrid.contentTpls && !!this.contentTpls) {
      (<any>this.contentTpls)._results.shift();
      this.treeGrid.contentTpls = this.contentTpls;
    }

    [this.head, this.nodes, this.elements] = this.treeGrid.build(this.id);


    if (this.head.length > 0 && !Type.isNull(this.head[0])) {
      if (this.head.length > 0) {
        this.needsDT = true;
        if (!this.head[0].hasOwnProperty('closed') || this.head[0].closed) {
          this.closed = false;
        }
        this.toggleState();
      }
    }
    if (this.nodes.length > 0 || this.elements.length > 0) {
      this.needsDD = true;
    }
  }

  toggleState() {
    this.closed = !this.closed;
    if (this.needsDT) {
      this.head[0].closed = this.closed;
    }
  }

}
