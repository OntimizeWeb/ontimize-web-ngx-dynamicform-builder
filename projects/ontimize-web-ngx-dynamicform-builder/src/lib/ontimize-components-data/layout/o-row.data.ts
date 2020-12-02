import { DEFAULT_INPUTS_O_ROW } from 'ontimize-web-ngx';

import { OComponentDataLayout } from './o-component-data-layout.class';

export class ORowData extends OComponentDataLayout {

  public getDirective(): string {
    return super.getOverridedDirective() || 'o-row';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_ROW;
  }

}
