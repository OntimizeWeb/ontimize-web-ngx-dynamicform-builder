import { ComponentPropertiesComponent } from './component-properties/component-properties.component';
import { InputsArrayComponent } from './component-properties/inputs-array/inputs-array.component';
import { ComponentsMenuComponent } from './components-menu/components-menu.component';
import { BooleanMetadataComponent } from './components-metadata/boolean-metadata.component';
import { ComboMetadataComponent } from './components-metadata/combo-metadata.component';
import { TextMetadataComponent } from './components-metadata/text-metadata.component';
import { ComponentsTreeComponent } from './components-tree/components-tree.component';
import { TreeLeafComponent } from './components-tree/tree-leaf/tree-leaf.component';
import { ODynamicFormBuilderComponent } from './o-dynamic-form-builder.component';

export { ODynamicFormBuilderComponent } from './o-dynamic-form-builder.component';
export * from './components-metadata/index';

export const O_DYNAMICFORM_BUILDER_COMPONENTS: any = [
  ComponentsMenuComponent,
  ComponentsTreeComponent,
  TreeLeafComponent,
  ComponentPropertiesComponent,
  InputsArrayComponent,
  TextMetadataComponent,
  BooleanMetadataComponent,
  ComboMetadataComponent,
  ODynamicFormBuilderComponent
];
