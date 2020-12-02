import { DEFAULT_INPUTS_O_PASSWORD_INPUT } from 'ontimize-web-ngx';

import { OTextInputData } from './o-text-input.data';

export class OPasswordInputData extends OTextInputData {

  public getDirective(): string {
    return super.getOverridedDirective() || 'o-password-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_PASSWORD_INPUT;
  }

}
