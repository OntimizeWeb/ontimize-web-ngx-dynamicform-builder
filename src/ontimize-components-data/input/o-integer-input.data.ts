import { DEFAULT_INPUTS_O_INTEGER_INPUT } from 'ontimize-web-ng2/ontimize';
import { OComponentData } from '../o-component-data.class';

export class OIntegerInputData extends OComponentData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-integer-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_INTEGER_INPUT;
  }
}
