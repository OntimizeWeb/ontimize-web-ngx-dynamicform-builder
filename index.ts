import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DndModule } from 'ng2-dnd';
import { ODataTableModule } from 'ontimize-web-ngx-datatable';
import { DynamicFormModule } from 'ontimize-web-ngx-dynamicform';

import { OntimizeWebModule } from 'ontimize-web-ngx';

import {
  SHARED_DIRECTIVES,
  AppMenuService,
  ComponentsDataService
} from './src/components-index';

import { ODynamicFormBuilderComponent } from './src/o-dynamic-form-builder.component';

export { ODynamicFormBuilderComponent } from './src/o-dynamic-form-builder.component';
import { ComponentSettingsDialogComponent } from './src/component-settings-dialog.component';

export { ComponentSettingsDialogComponent } from './src/component-settings-dialog.component';

export function getAppMenuServiceProvider() {
  return new AppMenuService();
}

export function getComponentsDataServiceProvider() {
  return new ComponentsDataService();
}

export const DYNAMIC_FORM_BUILDER_PROVIDERS = [
  {
    provide: AppMenuService,
    useFactory: getAppMenuServiceProvider
  },
  {
    provide: ComponentsDataService,
    useFactory: getComponentsDataServiceProvider
  }
];

@NgModule({
  imports: [
    OntimizeWebModule,
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    ODataTableModule,
    DynamicFormModule
  ],
  declarations: [
    SHARED_DIRECTIVES,
    ComponentSettingsDialogComponent,
    ODynamicFormBuilderComponent
  ],
  exports: [
    SHARED_DIRECTIVES,
    ComponentSettingsDialogComponent,
    ODynamicFormBuilderComponent
  ],
  providers: [
    ...DYNAMIC_FORM_BUILDER_PROVIDERS
  ]
})
export class DynamicFormBuilderModule { }
