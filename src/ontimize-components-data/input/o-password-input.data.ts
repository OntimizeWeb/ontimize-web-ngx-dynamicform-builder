import { DEFAULT_INPUTS_O_PASSWORD_INPUT } from 'ontimize-web-ng2';
import { OComponentData } from '../o-component-data.class';

export class OPasswordInputData extends OComponentData {

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
