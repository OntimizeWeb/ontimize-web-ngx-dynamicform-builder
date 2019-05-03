import { Component, ContentChild, ContentChildren, HostBinding, QueryList, TemplateRef } from '@angular/core';

import { Type } from '../../utils';
import { TreeListDefault } from './tree-list.class';

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
  public header: QueryList<TemplateRef<any>>;

  @ContentChildren(TemplateRef)
  public contentTpls: QueryList<TemplateRef<any>>;

  @HostBinding('class')
  public gridType: string = 'grid';

  public gridCols: number = 3;
  public treeGridCols: number = 3;
  public treeGrid: TreeListDefault;
  public head: any[];
  public nodes: any[];
  public elements: any[];
  public id: string;
  public closed: boolean = true;

  public needsDT: boolean = false;
  public needsDD: boolean = false;

  public ngAfterContentInit(): void {
    this.update();
    if (!!this.treeGrid.update) {
      this.treeGrid.update.subscribe(() => this.update());
    }
  }

  public update(): void {
    if (!this.treeGrid.header) {
      this.treeGrid.header = this.header;
    }
    if (!this.treeGrid.contentTpls && !!this.contentTpls) {
      (this.contentTpls as any)._results.shift();
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

  public toggleState(): void {
    this.closed = !this.closed;
    if (this.needsDT) {
      this.head[0].closed = this.closed;
    }
  }

}
