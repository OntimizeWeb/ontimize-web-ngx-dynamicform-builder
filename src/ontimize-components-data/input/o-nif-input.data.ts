import { DEFAULT_INPUTS_O_NIF_INPUT } from 'ontimize-web-ngx';

import { OTextInputData } from './o-text-input.data';

export class ONifInputData extends OTextInputData {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-nif-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_NIF_INPUT;
  }

}
