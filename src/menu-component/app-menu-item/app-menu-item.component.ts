import {
  Component,
  HostBinding
} from '@angular/core';

import {
  Router,
  ActivatedRoute
} from '@angular/router';

import { AppMenuItem } from './app-menu-item.model';
import { OComponentData } from '../../ontimize-components-data/o-component-data.class';
import { ComponentsDataService } from '../../services/components-data.service';

export const DEFAULT_INPUTS_APP_MENU_ITEM = [
  'label: app-label',
  'icon: app-icon',
  'route: app-route',
  'style: app-style',
  'indent: app-indent',
  'onlyIcons: only-icons',
  'id : app-id'
];

export const DEFAULT_OUTPUTS_APP_MENU_ITEM = [

];

@Component({
  moduleId: module.id,
  selector: 'app-menu-item',
  inputs: DEFAULT_INPUTS_APP_MENU_ITEM,
  outputs: DEFAULT_OUTPUTS_APP_MENU_ITEM,
  templateUrl: '/menu-component/app-menu-item/app-menu-item.component.html',
  styleUrls: ['/menu-component/app-menu-item/app-menu-item.component.css']
})
export class AppMenuItemComponent implements AppMenuItem {

  public static DEFAULT_INPUTS_APP_MENU_ITEM = DEFAULT_INPUTS_APP_MENU_ITEM;
  public static DEFAULT_OUTPUTS_APP_MENU_ITEM = DEFAULT_OUTPUTS_APP_MENU_ITEM;

  label: string = '';
  icon: string;
  route: string;
  type: string;
  style: string;
  id: string;

  @HostBinding('class.nolabels')
  onlyIcons: boolean;

  @HostBinding('class.only-label')
  noIcon: boolean;

  indent: string;
  externalLink: boolean = false;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private componentsDataService: ComponentsDataService) {
  }


  ngOnInit() {
    if (/^http/.exec(this.route)) {
      this.externalLink = true;
    }
    if (!this.icon) {
      this.noIcon = true;
    }
  }

  getDraggableData(): OComponentData {
    return this.componentsDataService.getOntimizeComponentData(this.id);
  }

  onSelectAppMenuItem($event, route) {
    if (!route) {
      return;
    }
    var w: any = (<any>window);
    var electron = w.System && w.System._nodeRequire ? w.System._nodeRequire('electron') : null;
    if (this.externalLink) {
      if (!!electron) {
        let BrowserWindow = electron.remote.BrowserWindow;
        var win = new BrowserWindow({ width: 800, height: 600 });
        win.loadURL(route);
        win.setMenu(null);
      } else {
        w.open(route);
      }
    } else {
      this.router.navigate([route]);
    }
  }
}
