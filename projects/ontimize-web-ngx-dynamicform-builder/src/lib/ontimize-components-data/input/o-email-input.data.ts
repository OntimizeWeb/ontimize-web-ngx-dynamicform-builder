import { DEFAULT_INPUTS_O_EMAIL_INPUT } from 'ontimize-web-ngx';

import { OTextInputData } from './o-text-input.data';

export class OEmailInputData extends OTextInputData {

  public getDirective(): string {
    return 'o-email-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_EMAIL_INPUT;
  }

}
