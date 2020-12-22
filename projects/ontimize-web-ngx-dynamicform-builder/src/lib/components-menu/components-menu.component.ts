import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDragExit } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { OComponentData } from '../ontimize-components-data/o-component-data.class';
import { AppDataService } from '../services/app-data.service';
import { ComponentsDataService } from '../services/components-data.service';
import { LayoutsDialogComponent } from './layouts-dialog/layouts-dialog.component';

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
export class ComponentsMenuComponent {
  layoutItems: any[] = [];
  componentItems: any[] = [];

  @Input() dragEnabled: boolean;
  @Input() connectedDropListIds: string[];

  @Output() modeChange: EventEmitter<any> = new EventEmitter();

  public selectedIndex: number;

  constructor(
    private appDataService: AppDataService,
    private componentsDataService: ComponentsDataService,
    protected domSanitizer: DomSanitizer,
    protected matIconRegistry: MatIconRegistry,
    protected dialog: MatDialog
  ) {
    this.appDataService.getMenu().subscribe((items: any) => {
      this.layoutItems = items.filter(i => i.id === 'LAYOUT');
      this.componentItems = items.filter(i => i.id !== 'LAYOUT');
    });
    this.matIconRegistry.addSvgIconInNamespace('odfb', 'o-text-input-icon', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/text_fields-24px.svg"));
    this.matIconRegistry.addSvgIconInNamespace('odfb', 'o-integer-input-icon', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icon_integer-24px.svg"));


    this.matIconRegistry.addSvgIconInNamespace('odfb', 'o-real-input-icon', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icon-real-24px.svg"));
    this.matIconRegistry.addSvgIconInNamespace('odfb', 'o-nif-input-icon', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icon-nif-24px.svg"));
    this.matIconRegistry.addSvgIconInNamespace('odfb', 'o-email-input-icon', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/baseline-email-24px.svg"));
    this.matIconRegistry.addSvgIconInNamespace('odfb', 'o-password-input-icon', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/baseline-vpn_key-24px.svg"));
    this.matIconRegistry.addSvgIconInNamespace('odfb', 'o-textarea-input-icon', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icon-textarea-24px.svg"));

    this.matIconRegistry.addSvgIconInNamespace('odfb', 'o-checkbox-input-icon', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/check_box-24px.svg"));
  
    this.matIconRegistry.addSvgIconInNamespace('odfb', 'o-container', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icon_container-24px.svg"));
    

    this.matIconRegistry.addSvgIconLiteralInNamespace('odfb', 'combo', this.domSanitizer.bypassSecurityTrustHtml(`<svg height='300px' width='300px'  fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M92.5,30h-85C6.119,30,5,31.119,5,32.5v35C5,68.881,6.119,70,7.5,70h85c1.381,0,2.5-1.119,2.5-2.5v-35  C95,31.119,93.881,30,92.5,30z M90,65H10V35h80V65z"></path><path d="M76.616,53.384c0.244,0.244,0.564,0.366,0.884,0.366s0.64-0.122,0.884-0.366l5-5c0.357-0.357,0.464-0.895,0.271-1.362  c-0.193-0.467-0.649-0.771-1.155-0.771h-10c-0.505,0-0.961,0.305-1.155,0.771c-0.193,0.467-0.086,1.005,0.271,1.362L76.616,53.384z"></path></svg>`));
    this.matIconRegistry.addSvgIconLiteralInNamespace('odfb', 'listpicker', this.domSanitizer.bypassSecurityTrustHtml(`<svg height='300px' width='300px'  fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M92.5,30h-85C6.119,30,5,31.119,5,32.5v35C5,68.881,6.119,70,7.5,70h85c1.381,0,2.5-1.119,2.5-2.5v-35  C95,31.119,93.881,30,92.5,30z M90,65H10V35h80V65z"></path><path d="M76.621,54.492c0.987,0,1.927-0.19,2.798-0.523l3.843,6.657c0.231,0.401,0.652,0.625,1.083,0.625  c0.212,0,0.427-0.054,0.624-0.167c0.598-0.345,0.803-1.11,0.458-1.708l-3.842-6.654c1.771-1.444,2.906-3.642,2.906-6.1  c0-4.34-3.531-7.871-7.871-7.871c-4.34,0-7.871,3.531-7.871,7.871C68.75,50.961,72.281,54.492,76.621,54.492z M76.621,41.25  c2.961,0,5.371,2.41,5.371,5.371s-2.409,5.371-5.371,5.371s-5.371-2.409-5.371-5.371S73.66,41.25,76.621,41.25z"></path></svg>`));
  }

  setActiveComponentsSelectors(index: number) {
    this.selectedIndex = index;
    this.modeChange.emit(this.getEditableComponentsSelectors(index));
  }

  isActiveIndex(index: number): boolean {
    return this.selectedIndex === index;
  }

  getOntimizeComponentData(component: any): OComponentData {
    if (component['ontimize-component'] != null) {
      return this.componentsDataService.getOntimizeComponentData(component['ontimize-component']);
    }
    return component;
  }

  private getEditableComponentsSelectors(selectedTabIndex: number) {
    // TODO temporal solution
    const array = [];
    array.push(...this.componentItems);
    array.push(...this.layoutItems);
    // const array = selectedTabIndex === 0 ? this.componentItems : this.layoutItems;
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

  openLayoutsDialog(callback?: (definition: any) => void) {
    const layoutComponents = JSON.parse(JSON.stringify(this.layoutItems));
    layoutComponents.forEach(layout => {
      layout.elements = layout.elements.filter(e => e.hasOwnProperty('ontimize-component'))
    });
    const dialogRef = this.dialog.open(LayoutsDialogComponent, {
      width: '50%',
      height: '50%',
      disableClose: false,
      data: {
        basicComponents: this.componentItems,
        layoutComponents: layoutComponents
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res != null && callback != null) {
        callback(res);
      }
    });
  }
}
