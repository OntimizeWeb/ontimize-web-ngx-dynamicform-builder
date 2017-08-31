import { Injectable } from '@angular/core';

import { MENU_JSON_DATA } from '../assets/menu.data';

@Injectable()
export class AppMenuService {

  getMenu(): any {
    return MENU_JSON_DATA;
  }

}
