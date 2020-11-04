import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentsAttrsService {

  protected componentAttrs: string[] = [];
  protected subscriptions: Subscription = new Subscription();

  public destroy() {
    this.subscriptions.unsubscribe();
  }

  public setFormDefinitionListener($formDefinition: BehaviorSubject<any>) {
    this.subscriptions.add($formDefinition.subscribe(definition => {
      if (definition && definition.components) {
        const allAttrs = [];
        definition.components.forEach(c => {
          allAttrs.push(...this.getAttrs(c));
        });
        this.componentAttrs = allAttrs;
      }
    }));
  }

  public isAttrUnique(attr: string): boolean {
    return this.componentAttrs.indexOf(attr) === -1;
  }

  private getAttrs(comp: any): string[] {
    const result = [comp.attr];
    if (comp.children != null) {
      comp.children.forEach(child => {
        result.push(...this.getAttrs(child));
      });
    }
    return result;
  }
}
