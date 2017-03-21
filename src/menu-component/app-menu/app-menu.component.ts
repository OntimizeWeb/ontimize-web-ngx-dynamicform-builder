import { Component } from '@angular/core';
import { AppMenuItem } from '../app-menu-item/app-menu-item.model';
import { TreeListDefault } from '../tree-grid/tree-list.class';
import { AppMenuService } from '../../services/app-menu.service';
// import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  inputs: [
    'id',
    'uiElement: ui-element',
    'apps: docked-apps',
    'closed',
    'onlyIcons: only-icons',
    'flat: ui-flat',
    'gridCols: grid-columns',
    'treeGridCols: tree-grid-columns'
  ],
  templateUrl: '/menu-component/app-menu/app-menu.component.html',
  styleUrls: ['/menu-component/app-menu/app-menu.component.css']
})

export class AppMenuComponent {
  id: string;
  flat: boolean = false;
  treeList: TreeListDefault = new TreeListDefault();

  constructor(private appMenuService: AppMenuService) {
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

  get gridType() {
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

  get appStyle() {
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

  private get model() {
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

  // private get controller() {
  // 	return undefined;
  // 	// return this.dispatcher.AppMenu.controller;
  // }
  // constructor() {
  // 	// constructor(private dispatcher: AppDispatcherFactory) {
  // 	// let api = this.dispatcher.AppMenu.api;
  // 	// api.read((s, b) => s.next(api.backToModel(b)), {json: 'AppMenu.' + this.id + '.groups'}).subscribe(model => this.model.groups = model.groups);
  // 	// api.read((s, b) => s.next(api.backToModel(b)), {json: 'AppMenu.' + this.id + '.items'}).subscribe(model => this.model.items = model.items);
  // }
  setMenu(menuObject: any) {
    this.model.groups = menuObject.groups;
    this.treeList.setGroups(menuObject.groups);
    this.model.items = menuObject.elements;
    this.treeList.setElements(menuObject.elements);
  }

  ngAfterViewInit() {
    // 	//	this.dispatcher.AppMenu.register(this.id, { view: this });

    // 	// this.treeList.setGroupsFilter(o => o.id || '');
    // 	// this.treeList.setElementsFilter(o => o.parent || '');
    // 	// this.treeList.setGroupParentsFilter(o => o.parent || '');

    // 	//this.appMenuService.loadMenu(this.menuName);
    // 	this.controller.load(this.id);

    this.setMenu(this.appMenuService.getMenu());

    // this.appMenuService.getMenu()
    //   .subscribe(
    //   menuData => this.setMenu(menuData),
    //   err => {
    //     console.log(err);
    //   });
    this.uiElement = 'sidebar';
  }
}
