import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'ontimize-web-ngx';


@Component({
  selector: 'tree-leaf',
  templateUrl: './tree-leaf.component.html',
  styleUrls: ['./tree-leaf.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.tree-leaf]': 'true'
  }
})
export class TreeLeafComponent {

  @Input() node: any;
  @Input() treeControl: NestedTreeControl<any>;

  @Output() public deleteLeaf: EventEmitter<any> = new EventEmitter();

  protected dialogService: DialogService;

  constructor(
    protected injector: Injector,
  ) {
    this.dialogService = this.injector.get(DialogService);
  }

  get isLayoutNode(): boolean {
    return this.node && (this.node['ontimize-directive'] === 'o-row' || this.node['ontimize-directive'] === 'o-column');
  }

  get hasEmptyChildren(): boolean {
    return this.isLayoutNode && this.node && this.node.children.length === 0;
  }

  deleteNode(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialogService.confirm('CONFIRM', 'MESSAGES.CONFIRM_DELETE').then(res => {
      if (res === true) {
        this.deleteLeaf.emit({
          component: this.node
        });
      }
    });
  }

}

