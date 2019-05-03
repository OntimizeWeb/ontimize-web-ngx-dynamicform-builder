import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DndModule } from '@churchs19/ng2-dnd';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { DynamicFormModule } from 'ontimize-web-ngx-dynamicform';

import { ComponentSettingsDialogComponent, O_DYNAMICFORM_BUILDER_COMPONENTS } from './src/components-index';
import { O_DYNAMICFORM_BUILDER_PROVIDERS } from './src/services';
import { ODynamicFormBuilderTranslateModule } from './src/utils/odfb-translate.pipe';

export * from './src/components-index';
export * from './src/services';

@NgModule({
  imports: [
    OntimizeWebModule,
    CommonModule,
    DndModule,
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
