import { Component, forwardRef, HostBinding, HostListener, Inject, Injector, Input, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'ontimize-web-ngx';

import { ComponentFlatNode } from '../component-node';
import { ComponentsTreeComponent } from '../components-tree.component';

@Component({
  selector: 'tree-leaf',
  templateUrl: './tree-leaf.component.html',
  styleUrls: ['./tree-leaf.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeLeafComponent {

  @Input() node: ComponentFlatNode;

  @HostBinding('class') get cssClass() { return `tree-leaf node-level-${this.node.level}`; }
  @HostBinding('class.hover') get hoverClass() { return this.node.hover; }
  @HostBinding('class.empty') get emptyClass() { return this.node.empty; }
  @HostBinding('class.dragging') get draggingClass() { return this.componentsTree.dragging; }

  protected hovering: boolean = false;
  @HostListener('mouseenter') onMouseEnter() { this.hovering = true; }
  @HostListener('mouseleave') onMouseLeave() { this.hovering = false; }

  protected visibleDelete: boolean = false;

  protected dialogService: DialogService;

  constructor(
    protected injector: Injector,
    @Inject(forwardRef(() => ComponentsTreeComponent)) public componentsTree: ComponentsTreeComponent
  ) {
    this.dialogService = this.injector.get(DialogService);
  }

  get visibleComponentActions(): boolean {
    return !this.componentsTree.dragging && (this.hovering || this.visibleDelete);
  }

  get visibleContainerActions(): boolean {
    return !this.componentsTree.dragging && this.hovering && this.node.expandable;
  }

  deleteNode(event: MouseEvent) {
    this.visibleDelete = true;
    event.preventDefault();
    event.stopPropagation();
    this.dialogService.confirm('CONFIRM', 'MESSAGES.CONFIRM_DELETE').then(res => {
      this.visibleDelete = false;
      if (res === true) {
        this.componentsTree.deleteNode(this.node.attr);
      }
    });
  }

  public changeComponentSelector(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.componentsTree.changeComponentSelector(this.node.attr);
  }

  public addPredefinedLayout(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.componentsTree.addPredefinedLayout(this.node.attr);
  }
}

