import { DEFAULT_INPUTS_O_CURRENCY_INPUT } from 'ontimize-web-ngx';

import { InputMetadata } from '../../types/inputs-metadata.type';
import { ORealInputData } from './o-real-input.data';

export class OCurrencyInputData extends ORealInputData {

  public getDirective(): string {
    return super.getOverridedDirective() || 'o-currency-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_CURRENCY_INPUT;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'currency-symbol',
      type: 'combo',
      label: 'currency-symbol',
      tooltip: '',
      default: 'EUR',
      required: false,
      values: ['USD', 'EUR', 'CRC', 'GBP', 'ILS', 'INR', 'JPY', 'KRW', 'NGN', 'PHP', 'PLN', 'PYG', 'THB', 'UAH', 'VND']
    }, {
      input: 'currency-symbol-position',
      type: 'combo',
      label: 'currency-symbol-position',
      tooltip: '',
      default: 'right',
      required: false,
      values: ['left', 'right']
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

}
