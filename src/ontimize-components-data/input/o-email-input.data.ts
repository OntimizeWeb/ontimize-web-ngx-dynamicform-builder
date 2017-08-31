import { DEFAULT_INPUTS_O_EMAIL_INPUT } from 'ontimize-web-ng2';
import { OComponentData } from '../o-component-data.class';

export class OEmailInputData extends OComponentData {

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
