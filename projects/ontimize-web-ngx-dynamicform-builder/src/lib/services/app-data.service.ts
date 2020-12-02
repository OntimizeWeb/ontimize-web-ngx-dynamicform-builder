import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { LAYOUTS_JSON_DATA } from '../assets/layouts.data';
import { MENU_JSON_DATA } from '../assets/menu.data';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  protected menuSubject: BehaviorSubject<any> = new BehaviorSubject(MENU_JSON_DATA);
  protected layoutsSubject: BehaviorSubject<any> = new BehaviorSubject(LAYOUTS_JSON_DATA);

  public getMenu(): Observable<any> {
    return this.menuSubject;
  }

  public getLayouts(): Observable<any> {
    return this.layoutsSubject;
  }

}
