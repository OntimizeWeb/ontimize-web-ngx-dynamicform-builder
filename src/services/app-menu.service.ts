import { Injectable } from '@angular/core';
import {
  Http,
  Headers
} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class AppMenuService {

  constructor(protected http: Http) {
  }

  getMenu(): any {
    var headers: Headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http
      .get('assets/menu.json', { headers: headers });
  }
}
