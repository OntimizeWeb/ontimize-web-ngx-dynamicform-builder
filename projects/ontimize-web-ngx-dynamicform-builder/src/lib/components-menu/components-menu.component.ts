import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDragExit } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

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
  layoutItems: any[] = [];
  componentItems: any[] = [];

  @Input() dragEnabled: boolean;
  @Input() connectedDropListIds: string[];

  @Output() modeChange: EventEmitter<any> = new EventEmitter();
  protected selectedCategoryDiv: any;
  protected visibleDiv: any;

  @ViewChild('componentsSelector', { static: false }) componentsSelectorDiv: ElementRef<any>;
  @ViewChild('componentItemsDiv', { static: false }) componentItemsDiv: ElementRef<any>;

  constructor(
    private appMenuService: AppMenuService,
    private componentsDataService: ComponentsDataService,
    protected domSanitizer: DomSanitizer,
    protected matIconRegistry: MatIconRegistry
  ) {
    this.appMenuService.getMenu().subscribe((items: any) => {
      this.layoutItems = items.filter(i => i.id === 'LAYOUT');
      this.componentItems = items.filter(i => i.id !== 'LAYOUT');
    });

    this.matIconRegistry.addSvgIconLiteralInNamespace('odfb', 'text', this.domSanitizer.bypassSecurityTrustHtml(`<svg height='300px' width='300px'  fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M15,58.75c-0.69,0-1.25,0.56-1.25,1.25s0.56,1.25,1.25,1.25h10c0.69,0,1.25-0.56,1.25-1.25s-0.56-1.25-1.25-1.25h-3.75  v-17.5H25c0.69,0,1.25-0.56,1.25-1.25s-0.56-1.25-1.25-1.25H15c-0.69,0-1.25,0.56-1.25,1.25s0.56,1.25,1.25,1.25h3.75v17.5H15z"></path><path d="M92.5,30h-85C6.119,30,5,31.119,5,32.5v35C5,68.881,6.119,70,7.5,70h85c1.381,0,2.5-1.119,2.5-2.5v-35  C95,31.119,93.881,30,92.5,30z M90,65H10V35h80V65z"></path></svg>`));
    this.matIconRegistry.addSvgIconLiteralInNamespace('odfb', 'combo', this.domSanitizer.bypassSecurityTrustHtml(`<svg height='300px' width='300px'  fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M92.5,30h-85C6.119,30,5,31.119,5,32.5v35C5,68.881,6.119,70,7.5,70h85c1.381,0,2.5-1.119,2.5-2.5v-35  C95,31.119,93.881,30,92.5,30z M90,65H10V35h80V65z"></path><path d="M76.616,53.384c0.244,0.244,0.564,0.366,0.884,0.366s0.64-0.122,0.884-0.366l5-5c0.357-0.357,0.464-0.895,0.271-1.362  c-0.193-0.467-0.649-0.771-1.155-0.771h-10c-0.505,0-0.961,0.305-1.155,0.771c-0.193,0.467-0.086,1.005,0.271,1.362L76.616,53.384z"></path></svg>`));
    this.matIconRegistry.addSvgIconLiteralInNamespace('odfb', 'listpicker', this.domSanitizer.bypassSecurityTrustHtml(`<svg height='300px' width='300px'  fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M92.5,30h-85C6.119,30,5,31.119,5,32.5v35C5,68.881,6.119,70,7.5,70h85c1.381,0,2.5-1.119,2.5-2.5v-35  C95,31.119,93.881,30,92.5,30z M90,65H10V35h80V65z"></path><path d="M76.621,54.492c0.987,0,1.927-0.19,2.798-0.523l3.843,6.657c0.231,0.401,0.652,0.625,1.083,0.625  c0.212,0,0.427-0.054,0.624-0.167c0.598-0.345,0.803-1.11,0.458-1.708l-3.842-6.654c1.771-1.444,2.906-3.642,2.906-6.1  c0-4.34-3.531-7.871-7.871-7.871c-4.34,0-7.871,3.531-7.871,7.871C68.75,50.961,72.281,54.492,76.621,54.492z M76.621,41.25  c2.961,0,5.371,2.41,5.371,5.371s-2.409,5.371-5.371,5.371s-5.371-2.409-5.371-5.371S73.66,41.25,76.621,41.25z"></path></svg>`));
    this.matIconRegistry.addSvgIconLiteralInNamespace('odfb', 'textarea', this.domSanitizer.bypassSecurityTrustHtml(`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 26 26" style="enable-background:new 0 0 26 26;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#040006;stroke-width:1.8785;stroke-miterlimit:10;}.st1{fill:none;stroke:#040006;stroke-width:0.2942;stroke-miterlimit:10;}.st2{fill:none;}</style><g><rect x="4" y="4" class="st0" width="18.1" height="18.1"/><g><line class="st1" x1="17.5" y1="20.2" x2="20.1" y2="17.6"/><line class="st1" x1="18.6" y1="20.3" x2="20.1" y2="18.7"/><line class="st1" x1="19.6" y1="20.4" x2="20.3" y2="19.7"/></g><rect x="1" y="1" class="st2" width="24" height="24"/></g></svg>`));
    this.matIconRegistry.addSvgIconLiteralInNamespace('odfb', 'real', this.domSanitizer.bypassSecurityTrustHtml(`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26 26" style="enable-background:new 0 0 26 26;" xml:space="preserve"><style type="text/css">.odfbfloat{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;fill:#040006;}.st3{fill:none;}</style><text transform="matrix(1 0 0 1 2.5545 16.2349)" class="odfbfloat">1,25</text><rect x="1" y="1" class="st3" width="24" height="24"/></svg>`));
    this.matIconRegistry.addSvgIconLiteralInNamespace('odfb', 'integer', this.domSanitizer.bypassSecurityTrustHtml(`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26 26" style="enable-background:new 0 0 26 26;" xml:space="preserve"><style type="text/css">.odbfint{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;fill:#040006;}.st3{fill:none;}</style><text transform="matrix(1 0 0 1 2.9017 16.2349)" class="odbfint">123</text><rect x="1" y="1" class="st3" width="24" height="24"/></svg>`));
  }

  ngAfterViewInit() {
    const selectorDiv = this.componentsSelectorDiv ? this.componentsSelectorDiv.nativeElement : null;
    const itemsDiv = this.componentItemsDiv ? this.componentItemsDiv.nativeElement : null;
    this.setSelectors(0, selectorDiv, itemsDiv);
  }

  setSelectors(index: number, selectedCategory: any, visibleDiv: any) {
    this.selectedCategoryDiv = selectedCategory;
    this.visibleDiv = visibleDiv;
    this.modeChange.emit(this.getEditableComponentsSelectors(index));
  }

  isSelectedCategory(div: any): boolean {
    return this.selectedCategoryDiv === div;
  }

  isVisibleDiv(div: any): boolean {
    return this.visibleDiv === div;
  }

  getOntimizeComponentData(component: any): OComponentData {
    return this.componentsDataService.getOntimizeComponentData(component['ontimize-component']);
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

}
