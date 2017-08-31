import { DEFAULT_INPUTS_O_CURRENCY_INPUT } from 'ontimize-web-ng2';
import { OComponentData } from '../o-component-data.class';

export class OCurrencyInputData extends OComponentData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-currency-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_CURRENCY_INPUT;
  }

}
