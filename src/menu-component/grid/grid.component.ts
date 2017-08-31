import {
  Component,
  TemplateRef,
  ElementRef,
  ContentChildren,
  QueryList,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'grid',
  inputs: [
    'gridItems: grid-items',
    'gridType: grid-type',
    'gridCols: grid-columns',
    'iContentTpls: grid-templates'
  ],
  template: require('./grid.component.html'),
  styles: [require('./grid.component.scss')]
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
