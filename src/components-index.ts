import {
  AppMenuFrameComponent,
  AppMenuComponent,
  AppMenuTitleComponent,
  AppMenuItemComponent,
  TreeGridComponent,
  GridComponent
} from './menu-component';

import {
  TextMetadataComponent,
  BooleanMetadataComponent,
  ComboMetadataComponent
} from './components-metadata';

import { ComponentSettingsDialogComponent } from './component-settings-dialog.component';
import { ODynamicFormBuilderComponent } from './o-dynamic-form-builder.component';
import { ExtendedFormComponent } from './extended-form/extended-form.component';

export { ComponentSettingsDialogComponent } from './component-settings-dialog.component';
export { ODynamicFormBuilderComponent } from './o-dynamic-form-builder.component';
export * from './menu-component';
export * from './components-metadata';


export const O_DYNAMICFORM_BUILDER_COMPONENTS: any = [
  AppMenuFrameComponent,
  AppMenuComponent,
  AppMenuTitleComponent,
  AppMenuItemComponent,
  TreeGridComponent,
  GridComponent,
  TextMetadataComponent,
  BooleanMetadataComponent,
  ComboMetadataComponent,
  ComponentSettingsDialogComponent,
  ODynamicFormBuilderComponent,
  ExtendedFormComponent
];
