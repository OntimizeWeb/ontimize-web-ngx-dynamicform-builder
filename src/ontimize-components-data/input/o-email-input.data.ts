import { DEFAULT_INPUTS_O_EMAIL_INPUT } from 'ontimize-web-ng2';
import { OTextInputData } from './o-text-input.data';

export class OEmailInputData extends OTextInputData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-email-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_EMAIL_INPUT;
  }

}
