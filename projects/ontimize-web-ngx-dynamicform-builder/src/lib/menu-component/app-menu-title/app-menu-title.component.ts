import { animate, state, style, transition, trigger } from '@angular/animations';
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
  templateUrl: './app-menu-title.component.html',
  styleUrls: ['./app-menu-title.component.scss'],
  animations: [
    trigger('toggle', [
      state('opened', style({})),
      state('closed', style({
        transform: 'rotate(180deg)'
      })),
      transition('opened <=> closed', animate('0.15s'))
    ])
  ]
})
export class AppMenuTitleComponent extends AppMenuTitle {

  @HostBinding('class.nolabels')
  public onlyIcons: boolean;

  constructor() {
    super();
  }

}
