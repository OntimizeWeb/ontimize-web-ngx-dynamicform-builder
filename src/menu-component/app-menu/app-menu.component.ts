import { Component, OnInit } from '@angular/core';

import { AppMenuService } from '../../services/app-menu.service';
import { AppMenuItem } from '../app-menu-item/app-menu-item.model';
import { TreeListDefault } from '../tree-grid/tree-list.class';

@Component({
  selector: 'app-menu',
  inputs: [
    'id',
    'uiElement: ui-element',
    'apps: docked-apps',
    'closed',
    'onlyIcons: only-icons',
    'flat: ui-flat',
    'gridCols: grid-columns',
    'treeGridCols: tree-grid-columns',
    'dragEnabled: drag-enabled'
  ],
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  public id: string;
  public flat: boolean = false;
  public treeList: TreeListDefault = new TreeListDefault();
  public dragEnabled: boolean = true;

  constructor(private appMenuService: AppMenuService) { }

  public ngOnInit(): void {
    this.appMenuService.getMenu().subscribe(menu => this.setMenu(menu));
  }

  public setMenu(menuObject: any): void {
    this.model.groups = menuObject.groups;
    this.treeList.setGroups(menuObject.groups);
    this.model.items = menuObject.elements;
    this.treeList.setElements(menuObject.elements);
  }

  get uiElement(): string {
    return this.model.uiElement;
  }

  set uiElement(input: string) {
    this.model.uiElement = input;
  }

  get closed(): boolean {
    return this.model.closed;
  }

  set closed(input: boolean) {
    this.model.closed = input;
  }

  get gridType(): string {
    switch (this.uiElement) {
      case 'sidebar':
      case 'right sidebar':
        return 'column';
      case 'fab':
        return 'column-reverse';
      case 'toolbar':
        return 'row';
      case 'popup':
      case 'fullscreen':
      default:
        return 'grid';
    }
  }

  get gridCols(): number {
    return this.model.gridCols;
  }

  set gridCols(input: number) {
    this.model.gridCols = input;
  }

  get treeGridCols(): number {
    return this.model.treeGridCols;
  }

  set treeGridCols(input: number) {
    this.model.treeGridCols = input;
  }

  get appStyle(): string {
    switch (this.uiElement) {
      case 'sidebar':
      case 'right sidebar':
        return 'list';
      case 'fab':
        return 'fab';
      case 'toolbar':
        return 'tab';
      case 'fullscreen':
        return 'hub';
      case 'popup':
      default:
        return 'icon';
    }
  }

  get onlyIcons(): boolean {
    return this.model.onlyIcons;
  }

  set onlyIcons(input: boolean) {
    this.model.onlyIcons = input;
  }

  private get model(): any {
    return {
      items: new Array<AppMenuItem>(),
      groups: new Array<AppMenuItem>(),
      uiElement: 'sidebar',
      closed: false,
      onlyIcons: false,
      flat: false,
      gridCols: 3,
      treeGridCols: 3
    };
  }

}
