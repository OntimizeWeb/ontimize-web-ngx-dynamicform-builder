import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material';
import { ResizableModule } from 'angular-resizable-element';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { DynamicFormModule } from 'ontimize-web-ngx-dynamicform';

import { O_DYNAMICFORM_BUILDER_COMPONENTS } from './components-index';
import { LayoutsDialogComponent } from './components-menu/layouts-dialog/layouts-dialog.component';
import {
  ChooseSelectorDialogComponent,
} from './ontimize-components-data/choose-selector-dialog/choose-selector-dialog.component';
import { ODynamicFormBuilderTranslateModule } from './utils/odfb-translate.pipe';

export * from './components-index';
export * from './services/index';

@NgModule({
  imports: [
    CdkAccordionModule,
    OntimizeWebModule,
    MatTreeModule,
    CommonModule,
    DragDropModule,
    DynamicFormModule,
    ODynamicFormBuilderTranslateModule,
    ResizableModule
  ],
  declarations: O_DYNAMICFORM_BUILDER_COMPONENTS,
  exports: O_DYNAMICFORM_BUILDER_COMPONENTS,
  entryComponents: [LayoutsDialogComponent, ChooseSelectorDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DynamicFormBuilderModule { }
