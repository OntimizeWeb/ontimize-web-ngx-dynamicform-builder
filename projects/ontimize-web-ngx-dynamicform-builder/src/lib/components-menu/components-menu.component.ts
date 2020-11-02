import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDragExit } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { ODynamicFormComponent } from 'ontimize-web-ngx-dynamicform';
import { Subject, Subscription } from 'rxjs';

import { OComponentData } from '../ontimize-components-data/o-component-data.class';
import { AppMenuService } from '../services/app-menu.service';
import { ComponentsDataService } from '../services/components-data.service';

@Component({
  selector: 'components-menu',
  templateUrl: './components-menu.component.html',
  styleUrls: ['./components-menu.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({ height: '0px', display: 'none' })),
      state('expanded', style({ height: '*', display: 'block' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.components-menu]': 'true'
  }
})
export class ComponentsMenuComponent implements AfterViewInit {
  expansions: { [key: string]: boolean } = {};
  private _onDestroy = new Subject<void>();

  layoutItems: any[] = [];
  componentItems: any[] = [];

  @Input() dragEnabled: boolean;
  @Input() dynamicForm: ODynamicFormComponent;
  
  @Output() modeChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('tabGroup', { static: false }) tabGroup: MatTabGroup;

  protected subscriptions: Subscription = new Subscription();

  constructor(
    private appMenuService: AppMenuService,
    private componentsDataService: ComponentsDataService
  ) {
    this.appMenuService.getMenu().subscribe((items: any) => {
      // this.menuItems = items;
      this.layoutItems = items.filter(i => i.id === 'LAYOUT');
      this.componentItems = items.filter(i => i.id !== 'LAYOUT');
    });
  }

  ngAfterViewInit() {
    if (this.tabGroup) {
      this.subscriptions.add(this.tabGroup.selectedIndexChange.subscribe(index => {
        this.modeChange.emit(this.getEditableComponentsSelectors(index));
      }));
      this.modeChange.emit(this.getEditableComponentsSelectors(this.tabGroup.selectedIndex));
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    if (this.tabGroup) {
      this.subscriptions.unsubscribe();
    }
  }

  _getExpandedState(category: string) {
    return this.getExpanded(category) ? 'expanded' : 'collapsed';
  }

  toggleExpand(category: string) {
    this.expansions[category] = !this.expansions[category];
  }

  getExpanded(category: string): boolean {
    return this.expansions[category] === undefined ? true : this.expansions[category];
  }

  getOntimizeComponentData(component: any): OComponentData {
    return this.componentsDataService.getOntimizeComponentData(component['ontimize-component']);
  }

  private getEditableComponentsSelectors(selectedTabIndex: number) {
    const array = selectedTabIndex === 0 ? this.componentItems : this.layoutItems;
    const res = array.reduce((a, b) => {
      a.push(...(b.elements || []).map(el => el['ontimize-component']));
      return a;
    }, []);
    return res;
  }

  protected currentExitedArray;

  entered() {
    if (this.currentExitedArray) {
      const tempItem = this.currentExitedArray.findIndex(item => item.temp);
      if (tempItem !== -1) {
        this.currentExitedArray.splice(tempItem, 1);
        this.currentExitedArray = undefined;
      }
    }
  }

  exited(e: CdkDragExit<string>) {
    const dataArray: any = e.container.data;
    if (!dataArray.find(item => item.temp)) {
      this.currentExitedArray = dataArray;
      const index = e.container.getItemIndex(e.item);
      const item = Object.assign({}, e.container.data[index], { temp: true });
      this.currentExitedArray.splice(index + 1, 0, item);
    }
  }

}
