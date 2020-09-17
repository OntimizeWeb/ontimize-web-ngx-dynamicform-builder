import { DEFAULT_INPUTS_O_PERCENT_INPUT } from 'ontimize-web-ngx';

import { ORealInputData } from './o-real-input.data';

export class OPercentInputData extends ORealInputData {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-percent-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_PERCENT_INPUT;
  }

}
