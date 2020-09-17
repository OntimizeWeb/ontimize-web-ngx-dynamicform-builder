import { ComponentSettingsDialogComponent } from './component-settings-dialog.component';
import { BooleanMetadataComponent, ComboMetadataComponent, TextMetadataComponent } from './components-metadata/index';
import { ExtendedFormComponent } from './extended-form/extended-form.component';
import {
  AppMenuComponent,
  AppMenuFrameComponent,
  AppMenuItemComponent,
  AppMenuTitleComponent,
  GridComponent,
  TreeGridComponent,
} from './menu-component/index';
import { ODynamicFormBuilderComponent } from './o-dynamic-form-builder.component';

export { ComponentSettingsDialogComponent } from './component-settings-dialog.component';
export { ODynamicFormBuilderComponent } from './o-dynamic-form-builder.component';
export * from './menu-component/index';
export * from './components-metadata/index';

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
