import { DEFAULT_INPUTS_O_REAL_INPUT } from 'ontimize-web-ng2/ontimize';
import { OComponentData } from '../o-component-data.class';

export class ORealInputData extends OComponentData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-real-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_REAL_INPUT;
  }
}
