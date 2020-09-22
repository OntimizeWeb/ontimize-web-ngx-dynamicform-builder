import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { AppMenuService } from '../../services/app-menu.service';

@Component({
  selector: 'app-menu',
  inputs: [
    'dragEnabled: drag-enabled'
  ],
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({ height: '0px', display: 'none' })),
      state('expanded', style({ height: '*', display: 'block' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ])
  ]
})
export class AppMenuComponent implements OnInit {
  expansions: { [key: string]: boolean } = {};
  private _onDestroy = new Subject<void>();

  groups = new Array<any>();
  items = new Array<any>();

  constructor(
    private appMenuService: AppMenuService
  ) {

  }

  ngOnInit() {
    this.appMenuService.getMenu().subscribe(menu => this.setMenu(menu));
  }

  private setMenu(menuObject: any): void {
    this.groups = menuObject.groups;
    this.items = menuObject.elements;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getGroupItems(category: any): any[] {
    return this.items.filter(item => item.parent === category.id);
  }

  _getExpandedState(category: string) {
    return this.getExpanded(category) ? 'expanded' : 'collapsed';
  }

  toggleExpand(category: string) {
    this.expansions[category] = !this.expansions[category];
  }

  getExpanded(category: string): boolean {
    return this.expansions[category] === undefined ? true : this.expansions[category];
  }
}
