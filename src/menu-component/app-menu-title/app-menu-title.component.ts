import { Component, HostBinding } from '@angular/core';
import { AppMenuTitle } from './app-menu-title.class';

@Component({
  selector: 'app-menu-title',
  inputs: [
    'label: app-label',
    'style: app-style',
    'onlyIcons: only-icons',
    'closed: title-closed'
  ],
  template: require('./app-menu-title.component.html'),
  styles: [require('./app-menu-title.component.scss')]
})
export class AppMenuTitleComponent extends AppMenuTitle {
  @HostBinding('class.nolabels')
  onlyIcons: boolean;

  constructor() {
    super();
  }

}
