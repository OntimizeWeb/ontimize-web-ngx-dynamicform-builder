import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { DndModule } from 'ng2-dnd';
import { DynamicFormModule } from 'ontimize-web-ng2-dynamicform';

import { ONTIMIZE_MODULES } from 'ontimize-web-ng2/ontimize';

import {
  SHARED_DIRECTIVES,
  AppMenuService,
  ComponentsDataService
} from './src/components-index';

import { ODynamicFormBuilderComponent } from './src/o-dynamic-form-builder.component';

export { ODynamicFormBuilderComponent } from './src/o-dynamic-form-builder.component';
import { ComponentSettingsDialogComponent } from './src/component-settings-dialog.component';

export { ComponentSettingsDialogComponent } from './src/component-settings-dialog.component';


export const DYNAMIC_FORM_BUILDER_PROVIDERS = [
  {
    provide: AppMenuService,
    useFactory: (http) => new AppMenuService(http),
    deps: [Http]
  },
  {
    provide: ComponentsDataService,
    useFactory: (http) => new ComponentsDataService(http),
    deps: [Http]
  }
];

@NgModule({
  imports: [
    ONTIMIZE_MODULES,
    CommonModule,
    DndModule.forRoot(),
    DynamicFormModule.forRoot(),
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

export class DynamicFormBuilderModule {
}
