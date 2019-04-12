import { DEFAULT_INPUTS_O_COLUMN } from 'ontimize-web-ngx';

import { OComponentDataLayout } from './o-component-data-layout.class';

export class OColumnData extends OComponentDataLayout {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-column';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_COLUMN;
  }

}
