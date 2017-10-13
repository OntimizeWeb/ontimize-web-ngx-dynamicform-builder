import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdExpansionModule } from '@angular/material';
import { DndModule } from 'ng2-dnd';

import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ODataTableModule } from 'ontimize-web-ngx-datatable';
import { DynamicFormModule } from 'ontimize-web-ngx-dynamicform';

import { O_DYNAMICFORM_BUILDER_COMPONENTS, ComponentSettingsDialogComponent } from './src/components-index';
import { O_DYNAMICFORM_BUILDER_PROVIDERS } from './src/services';

export * from './src/components-index';
export * from './src/services';

@NgModule({
  imports: [
    MdExpansionModule,
    OntimizeWebModule,
    CommonModule,
    DndModule.forRoot(),
    ODataTableModule,
    DynamicFormModule
  ],
  declarations: O_DYNAMICFORM_BUILDER_COMPONENTS,
  exports: O_DYNAMICFORM_BUILDER_COMPONENTS,
  entryComponents: [
    ComponentSettingsDialogComponent
  ],
  providers: O_DYNAMICFORM_BUILDER_PROVIDERS
})
export class DynamicFormBuilderModule { }
