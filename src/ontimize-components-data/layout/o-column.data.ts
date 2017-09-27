import { DEFAULT_INPUTS_O_COLUMN } from 'ontimize-web-ngx';
import { OComponentDataLayout } from './o-component-data-layout.class';

export class OColumnData extends OComponentDataLayout {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-column';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_COLUMN;
  }

}
