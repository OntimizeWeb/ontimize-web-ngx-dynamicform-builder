import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, HostBinding, HostListener, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'ontimize-web-ngx';

import { ComponentFlatNode } from '../component-node';

@Component({
  selector: 'tree-leaf',
  templateUrl: './tree-leaf.component.html',
  styleUrls: ['./tree-leaf.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeLeafComponent {

  @Input() node: ComponentFlatNode;
  @Input() treeControl: FlatTreeControl<ComponentFlatNode>;

  @Output() deleteLeaf: EventEmitter<any> = new EventEmitter();

  @HostBinding('class') get cssClass() { return `tree-leaf node-level-${this.node.level}`; }
  @HostBinding('class.selected') get isSelected() { return this.node.selected; }

  protected hovering: boolean = false;
  @HostListener('mouseenter') onMouseEnter() { this.hovering = true; }
  @HostListener('mouseleave') onMouseLeave() { this.hovering = false; }

  protected visibleDelete: boolean = false;

  protected dialogService: DialogService;

  constructor(
    protected injector: Injector,
  ) {
    this.dialogService = this.injector.get(DialogService);
  }

  get visibleDeleteButton(): boolean {
    return this.hovering || this.visibleDelete;
  }

  deleteNode(event: any) {
    this.visibleDelete = true;
    event.preventDefault();
    event.stopPropagation();
    this.dialogService.confirm('CONFIRM', 'MESSAGES.CONFIRM_DELETE').then(res => {
      this.visibleDelete = false;
      if (res === true) {
        this.deleteLeaf.emit(this.node.attr);
      }
    });
  }

}

