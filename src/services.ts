import { AppMenuService } from './services/app-menu.service';
import { ComponentsDataService } from './services/components-data.service';

export { AppMenuService } from './services/app-menu.service';
export { ComponentsDataService } from './services/components-data.service';

export function getAppMenuServiceProvider() {
  return new AppMenuService();
}

export function getComponentsDataServiceProvider() {
  return new ComponentsDataService();
}

export const O_DYNAMICFORM_BUILDER_PROVIDERS: any = [
  {
    provide: AppMenuService,
    useFactory: getAppMenuServiceProvider
  },
  {
    provide: ComponentsDataService,
    useFactory: getComponentsDataServiceProvider
  }
];
