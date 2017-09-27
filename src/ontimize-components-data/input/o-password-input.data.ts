import { DEFAULT_INPUTS_O_PASSWORD_INPUT } from 'ontimize-web-ngx';
import { OTextInputData } from './o-text-input.data';

export class OPasswordInputData extends OTextInputData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-password-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_PASSWORD_INPUT;
  }

}
