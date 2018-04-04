import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';

import { OntimizeWebModule } from 'ontimize-web-ngx';
import { DynamicFormModule } from 'ontimize-web-ngx-dynamicform';

import { O_DYNAMICFORM_BUILDER_COMPONENTS, ComponentSettingsDialogComponent } from './src/components-index';
import { O_DYNAMICFORM_BUILDER_PROVIDERS } from './src/services';

export * from './src/components-index';
export * from './src/services';

@NgModule({
  imports: [
    OntimizeWebModule,
    CommonModule,
    DndModule.forRoot(),
    DynamicFormModule
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
