import { DEFAULT_INPUTS_O_NIF_INPUT } from 'ontimize-web-ng2/ontimize';
import { OComponentData } from '../o-component-data.class';

export class ONifInputData extends OComponentData {

  constructor() {
    super();
  }
  getDirective() {
    return 'o-nif-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_NIF_INPUT;
  }
}
