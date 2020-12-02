import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ComponentNode } from './component-node';

@Injectable()
export class ComponentsTreeDatabase {
  dataChange = new BehaviorSubject<ComponentNode[]>([]);

  get data(): ComponentNode[] { return this.dataChange.value; }

  initialize(arg: any[]) {
    const data = this.buildFileTree(arg, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `ComponentNode`.
   */
  buildFileTree(data: any[], level: number): ComponentNode[] {
    const result: ComponentNode[] = [];
    (data || []).forEach((element: any) => {
      const node = new ComponentNode(element);
      if (element.children) {
        node.children = this.buildFileTree(element.children, level + 1);
      }
      result.push(node);
    });
    return result;
  }
}
