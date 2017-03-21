import { Injectable } from '@angular/core';
import {
  Http
  // ,Headers
} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { MENU_JSON_DATA } from '../assets/menu.data';

@Injectable()
export class AppMenuService {

  constructor(protected http: Http) {
  }

  getMenu(): any {
    return MENU_JSON_DATA;
    //   var headers: Headers = new Headers();
    //   headers.append('Access-Control-Allow-Origin', '*');
    //   headers.append('Content-Type', 'application/json;charset=UTF-8');
    //   return this.http
    //     .get('src/assets/menu.json', { headers: headers })
    //     .map((res: any) => res.json());
  }
}
