import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import { Http } from '@angular/http';
import { DndModule } from 'ng2-dnd';
import { DynamicFormModule } from 'ontimize-web-ng2-dynamicform';

import {
  ONTIMIZE_MODULES,
  ONTIMIZE_DIRECTIVES
  // ,
  // ontimizeProviders,
  // ODialogComponent
} from 'ontimize-web-ng2/ontimize';

import {
  SHARED_DIRECTIVES,
  AppMenuService,
  ComponentsDataService
} from './src/components-index';

import { ODynamicFormBuilderComponent } from './src/o-dynamic-form-builder.component';
import { ComponentSettingsDialogComponent } from './src/component-settings-dialog.component';

// export { ComponentSettingsDialogComponent } from './src/component-settings-dialog.component';


// export const DYNAMIC_FORM_BUILDER_ENTRY_COMPONENTS = [
//   ComponentSettingsDialogComponent
// ];

// export const DYNAMIC_FORM_BUILDER_DIRECTIVES = [
//   ...SHARED_DIRECTIVES
//   // ,
//   // ComponentSettingsDialogComponent
// ];

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
    ODynamicFormBuilderComponent
  ],
  providers: [
    // MdIconRegistry,
    ...DYNAMIC_FORM_BUILDER_PROVIDERS
  ]
})

export class DynamicFormBuilderModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: DynamicFormBuilderModule,
  //     providers: []
  //   };
  // }
}
