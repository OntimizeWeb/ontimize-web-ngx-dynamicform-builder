import { DEFAULT_INPUTS_O_PERCENT_INPUT } from 'ontimize-web-ng2';
import { ORealInputData } from './o-real-input.data';

export class OPercentInputData extends ORealInputData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-percent-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_PERCENT_INPUT;
  }

}
