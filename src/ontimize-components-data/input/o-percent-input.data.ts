import { DEFAULT_INPUTS_O_PERCENT_INPUT } from 'ontimize-web-ng2';
import { OComponentData } from '../o-component-data.class';

export class OPercentInputData extends OComponentData {

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
