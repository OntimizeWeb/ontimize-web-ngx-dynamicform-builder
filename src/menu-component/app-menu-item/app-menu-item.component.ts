import {
  Component,
  HostBinding
} from '@angular/core';

import { AppMenuItem } from './app-menu-item.model';
import { OComponentData } from '../../ontimize-components-data/o-component-data.class';
import { ComponentsDataService } from '../../services/components-data.service';

export const DEFAULT_INPUTS_APP_MENU_ITEM = [
  'label: app-label',
  'icon: app-icon',
  'style: app-style',
  'indent: app-indent',
  'onlyIcons: only-icons',
  'id : app-id',
  'componentDragEnabled : drag-enabled'
];

export const DEFAULT_OUTPUTS_APP_MENU_ITEM = [

];

@Component({
  selector: 'app-menu-item',
  inputs: DEFAULT_INPUTS_APP_MENU_ITEM,
  outputs: DEFAULT_OUTPUTS_APP_MENU_ITEM,
  template: require('./app-menu-item.component.html'),
  styles: [require('./app-menu-item.component.scss')]
})
export class AppMenuItemComponent implements AppMenuItem {

  public static DEFAULT_INPUTS_APP_MENU_ITEM = DEFAULT_INPUTS_APP_MENU_ITEM;
  public static DEFAULT_OUTPUTS_APP_MENU_ITEM = DEFAULT_OUTPUTS_APP_MENU_ITEM;

  label: string = '';
  icon: string;
  type: string;
  style: string;
  id: string;
  componentDragEnabled: boolean = true;

  @HostBinding('class.nolabels')
  onlyIcons: boolean;

  @HostBinding('class.only-label')
  noIcon: boolean;

  indent: string;

  constructor(
    private componentsDataService: ComponentsDataService) {
  }


  ngOnInit() {
    if (!this.icon) {
      this.noIcon = true;
    }
  }

  getDraggableData(): OComponentData {
    return this.componentsDataService.getOntimizeComponentData(this.id);
  }

}
