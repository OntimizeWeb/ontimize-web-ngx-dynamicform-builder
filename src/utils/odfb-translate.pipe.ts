import { Injector, ModuleWithProviders, NgModule, Pipe } from '@angular/core';
import { OTranslatePipe, Util } from 'ontimize-web-ngx';

import { ODFB_TRANSLATIONS } from '../i18n/i18n';

@Pipe({
  name: 'odfbTranslate',
  pure: false // required to update the value when the promise is resolved
})
export class ODynamicFormBuilderTranslatePipe extends OTranslatePipe {

  constructor(protected injector: Injector) {
    super(injector);
  }

  public updateValue(key: string): void {
    let res: string;
    const args = Util.isDefined(this.lastParams) ? this.lastParams.values || [] : [];
    const bundle = ODFB_TRANSLATIONS[this.oTranslateService.getCurrentLang()];
    if (bundle && bundle[key]) {
      res = bundle[key];
    } else {
      res = this.oTranslateService.get(key, args);
    }

    this.value = res !== undefined ? res : key;
    this.lastKey = key;
    this._ref.markForCheck();
  }

}

@NgModule({
  declarations: [ODynamicFormBuilderTranslatePipe],
  exports: [ODynamicFormBuilderTranslatePipe]
})
export class ODynamicFormBuilderTranslateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ODynamicFormBuilderTranslateModule,
      providers: []
    };
  }
}
