import { DEFAULT_INPUTS_O_NIF_INPUT } from 'ontimize-web-ngx';
import { OTextInputData } from './o-text-input.data';

export class ONifInputData extends OTextInputData {

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
