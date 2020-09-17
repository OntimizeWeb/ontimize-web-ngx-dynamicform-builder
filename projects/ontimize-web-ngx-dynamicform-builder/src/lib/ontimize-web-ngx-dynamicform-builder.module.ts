import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { DynamicFormModule } from 'ontimize-web-ngx-dynamicform';

import { ComponentSettingsDialogComponent, O_DYNAMICFORM_BUILDER_COMPONENTS } from './components-index';
import { O_DYNAMICFORM_BUILDER_PROVIDERS } from './services/index';
import { ODynamicFormBuilderTranslateModule } from './utils/odfb-translate.pipe';

export * from './components-index';
export * from './services/index';

@NgModule({
  imports: [
    OntimizeWebModule,
    CommonModule,
    DragDropModule,
    DynamicFormModule,
    ODynamicFormBuilderTranslateModule
  ],
  declarations: O_DYNAMICFORM_BUILDER_COMPONENTS,
  exports: O_DYNAMICFORM_BUILDER_COMPONENTS,
  entryComponents: [
    ComponentSettingsDialogComponent
  ],
  providers: O_DYNAMICFORM_BUILDER_PROVIDERS,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DynamicFormBuilderModule { }
