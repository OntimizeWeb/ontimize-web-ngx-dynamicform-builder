import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MENU_JSON_DATA } from '../assets/menu.data';

@Injectable()
export class AppMenuService {

  protected resultSubject: BehaviorSubject<any> = new BehaviorSubject(MENU_JSON_DATA);

  public getMenu(): Observable<any> {
    return this.resultSubject;
  }

}
