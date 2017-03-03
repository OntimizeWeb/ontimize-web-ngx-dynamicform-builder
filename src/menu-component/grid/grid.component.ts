import {
  Component,
  TemplateRef,
  ElementRef,
  ContentChildren,
  QueryList,
  HostBinding
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'grid',
  inputs: [
    'gridItems: grid-items',
    'gridType: grid-type',
    'gridCols: grid-columns',
    'iContentTpls: grid-templates'
  ],
  templateUrl: '/menu-component/grid/grid.component.html',
  styleUrls: ['/menu-component/grid/grid.component.css']
})
export class GridComponent {
  @ContentChildren(TemplateRef)
  contentTpls: QueryList<TemplateRef<any>>;

  gridItems: Array<any> = new Array<any>();

  @HostBinding('class')
  gridType: string = 'grid';

  @HostBinding('style.columnCount')
  gridCols: number = 3;

  iContentTpls: QueryList<ElementRef>;
  templates: Array<ElementRef> = new Array<ElementRef>();

  ngAfterContentInit() {
    if (!!this.contentTpls) {
      this.templates = this.templates.concat((<any>this.contentTpls)._results);
    }
    if (!!this.iContentTpls) {
      this.templates = this.templates.concat((<any>this.iContentTpls)._results);
    }
  }
}
