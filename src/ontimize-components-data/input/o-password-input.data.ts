import { DEFAULT_INPUTS_O_PASSWORD_INPUT } from 'ontimize-web-ngx';

import { OTextInputData } from './o-text-input.data';

export class OPasswordInputData extends OTextInputData {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-password-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_PASSWORD_INPUT;
  }

}
