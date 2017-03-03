import {
  AppMenuFrameComponent,
  AppMenuComponent,
  AppMenuTitleComponent,
  AppMenuItemComponent,
  TreeGridComponent,
  GridComponent
} from './menu-component/index';

import {
  TextMetadataComponent,
  BooleanMetadataComponent,
  ComboMetadataComponent
} from './components-metadata/index';

export {
  AppMenuService,
  ComponentsDataService
} from './services/index';

export const SHARED_DIRECTIVES: any = [
  AppMenuFrameComponent,
  AppMenuComponent,
  AppMenuTitleComponent,
  AppMenuItemComponent,
  TreeGridComponent,
  GridComponent,
  TextMetadataComponent,
  BooleanMetadataComponent,
  ComboMetadataComponent
];
