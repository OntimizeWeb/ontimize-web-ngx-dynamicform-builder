import { DEFAULT_INPUTS_O_CURRENCY_INPUT } from 'ontimize-web-ngx';

import { ORealInputData } from './o-real-input.data';

export class OCurrencyInputData extends ORealInputData {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-currency-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_CURRENCY_INPUT;
  }

  public getTemplateInputsData(): any {
    const templateInputsData = super.getTemplateInputsData();
    templateInputsData['currency-symbol'] = {
      type: 'combo',
      label: 'currency-symbol',
      tooltip: '',
      default: 'EUR',
      required: false,
      values: ['USD', 'EUR', 'CRC', 'GBP', 'ILS', 'INR', 'JPY', 'KRW', 'NGN', 'PHP', 'PLN', 'PYG', 'THB', 'UAH', 'VND']
    };
    templateInputsData['currency-symbol-position'] = {
      type: 'combo',
      label: 'currency-symbol-position',
      tooltip: '',
      default: 'right',
      required: false,
      values: ['left', 'right']
    };
    return templateInputsData;
  }

}
