import { Component, HostBinding } from '@angular/core';
import { AppMenuTitle } from './app-menu-title.class';

@Component({
  moduleId: module.id,
  selector: 'app-menu-title',
  inputs: [
    'label: app-label',
    'style: app-style',
    'onlyIcons: only-icons',
    'closed: title-closed'
  ],
  templateUrl: '/menu-component/app-menu-title/app-menu-title.component.html',
  styleUrls: ['/menu-component/app-menu-title/app-menu-title.component.css']
})
export class AppMenuTitleComponent extends AppMenuTitle {
  @HostBinding('class.nolabels')
  onlyIcons: boolean;

  constructor() {
    super();
  }

}
