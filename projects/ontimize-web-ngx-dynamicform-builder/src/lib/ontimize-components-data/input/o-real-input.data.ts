import { DEFAULT_INPUTS_O_REAL_INPUT } from 'ontimize-web-ngx';

import { InputMetadata } from '../../types/inputs-metadata.type';
import { OIntegerInputData } from './o-integer-input.data';

export class ORealInputData extends OIntegerInputData {

  public getDirective(): string {
    return super.getOverridedDirective() || 'o-real-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_REAL_INPUT;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'min-decimal-digits',
      type: 'number',
      label: 'min-length',
      tooltip: '',
      default: 2,
      required: true
    }, {
      input: 'max-decimal-digits',
      type: 'number',
      label: 'max-length',
      tooltip: '',
      default: 2,
      required: true
    }, {
      input: 'decimal-separator',
      type: 'string',
      label: 'decimal-separator',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'decimal-digits',
      type: 'number',
      label: 'decimal-digits',
      tooltip: '',
      default: 2,
      required: false
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

}
