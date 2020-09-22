import { ComponentSettingsDialogComponent } from './component-settings-dialog.component';
import { BooleanMetadataComponent, ComboMetadataComponent, TextMetadataComponent } from './components-metadata/index';
import { ExtendedFormComponent } from './extended-form/extended-form.component';
import { AppMenuComponent } from './menu-component/app-menu/app-menu.component';
import { ODynamicFormBuilderComponent } from './o-dynamic-form-builder.component';

export { ComponentSettingsDialogComponent } from './component-settings-dialog.component';
export { ODynamicFormBuilderComponent } from './o-dynamic-form-builder.component';
export * from './components-metadata/index';

export const O_DYNAMICFORM_BUILDER_COMPONENTS: any = [
  AppMenuComponent,
  TextMetadataComponent,
  BooleanMetadataComponent,
  ComboMetadataComponent,
  ComponentSettingsDialogComponent,
  ODynamicFormBuilderComponent,
  ExtendedFormComponent
];
