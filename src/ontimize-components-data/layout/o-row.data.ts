import { DEFAULT_INPUTS_O_ROW } from 'ontimize-web-ng2/ontimize';
import { OComponentData } from '../o-component-data.class';

export class ORowData extends OComponentData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-row';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_ROW;
  }

  isContainer(): Boolean {
    return true;
  }
}
