import { ComponentPropertiesComponent } from './component-properties/component-properties.component';
import { ComponentSettingsDialogComponent } from './component-settings-dialog.component';
import { ComponentsMenuComponent } from './components-menu/components-menu.component';
import { BooleanMetadataComponent } from './components-metadata/boolean-metadata.component';
import { ComboMetadataComponent } from './components-metadata/combo-metadata.component';
import { TextMetadataComponent } from './components-metadata/text-metadata.component';
import { ODynamicFormBuilderComponent } from './o-dynamic-form-builder.component';

export { ComponentSettingsDialogComponent } from './component-settings-dialog.component';
export { ODynamicFormBuilderComponent } from './o-dynamic-form-builder.component';
export * from './components-metadata/index';

export const O_DYNAMICFORM_BUILDER_COMPONENTS: any = [
  ComponentsMenuComponent,
  ComponentPropertiesComponent,
  TextMetadataComponent,
  BooleanMetadataComponent,
  ComboMetadataComponent,
  ComponentSettingsDialogComponent,
  ODynamicFormBuilderComponent
];
