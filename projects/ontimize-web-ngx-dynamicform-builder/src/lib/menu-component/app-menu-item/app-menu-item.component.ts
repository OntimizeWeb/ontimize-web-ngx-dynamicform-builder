import { Component, HostBinding } from '@angular/core';

import { OComponentData } from '../../ontimize-components-data/o-component-data.class';
import { ComponentsDataService } from '../../services/components-data.service';
import { AppMenuItem } from './app-menu-item.model';

export const DEFAULT_INPUTS_APP_MENU_ITEM = [
  'label: app-label',
  'icon: app-icon',
  'svgIcon: app-svgicon',
  'style: app-style',
  'indent: app-indent',
  'onlyIcons: only-icons',
  'id : app-id',
  'componentDragEnabled : drag-enabled'
];

export const DEFAULT_OUTPUTS_APP_MENU_ITEM = [];

@Component({
  selector: 'app-menu-item',
  inputs: DEFAULT_INPUTS_APP_MENU_ITEM,
  outputs: DEFAULT_OUTPUTS_APP_MENU_ITEM,
  templateUrl: './app-menu-item.component.html',
  styleUrls: ['./app-menu-item.component.scss']
})
export class AppMenuItemComponent implements AppMenuItem {

  public label: string = '';
  public icon: string;
  public svgIcon: string;
  public type: string;
  public style: string;
  public id: string;
  public componentDragEnabled: boolean = true;

  @HostBinding('class.nolabels')
  public onlyIcons: boolean;

  @HostBinding('class.only-label')
  public noIcon: boolean;

  public indent: string;

  constructor(
    private componentsDataService: ComponentsDataService) {
  }

  public ngOnInit(): void {
    if (!this.icon) {
      this.noIcon = true;
    }
  }

  public getDraggableData(): OComponentData {
    return this.componentsDataService.getOntimizeComponentData(this.id);
  }

}
