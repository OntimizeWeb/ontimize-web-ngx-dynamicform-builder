import { ComponentPropertiesComponent } from './component-properties/component-properties.component';
import { BooleanMetadataComponent } from './component-properties/components-metadata/boolean-metadata.component';
import { ComboMetadataComponent } from './component-properties/components-metadata/combo-metadata.component';
import { TextMetadataComponent } from './component-properties/components-metadata/text-metadata.component';
import { InputsArrayComponent } from './component-properties/inputs-array/inputs-array.component';
import { ComponentsMenuComponent } from './components-menu/components-menu.component';
import { LayoutsDialogComponent } from './components-menu/layouts-dialog/layouts-dialog.component';
import { ComponentsTreeComponent } from './components-tree/components-tree.component';
import { TreeLeafComponent } from './components-tree/tree-leaf/tree-leaf.component';
import { ODynamicFormBuilderComponent } from './o-dynamic-form-builder.component';
import {
  ChooseSelectorDialogComponent,
} from './ontimize-components-data/choose-selector-dialog/choose-selector-dialog.component';

export const O_DYNAMICFORM_BUILDER_COMPONENTS: any = [
  ComponentsMenuComponent,
  ComponentsTreeComponent,
  TreeLeafComponent,
  ComponentPropertiesComponent,
  InputsArrayComponent,
  TextMetadataComponent,
  BooleanMetadataComponent,
  ComboMetadataComponent,
  ODynamicFormBuilderComponent,
  LayoutsDialogComponent,
  ChooseSelectorDialogComponent
];
