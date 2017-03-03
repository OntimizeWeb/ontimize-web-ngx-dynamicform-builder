import { DEFAULT_INPUTS_O_COLUMN } from 'ontimize-web-ng2/ontimize';
import { OComponentData } from '../o-component-data.class';

export class OColumnData extends OComponentData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-column';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_COLUMN;
  }

  isContainer(): Boolean {
    return true;
  }
}
