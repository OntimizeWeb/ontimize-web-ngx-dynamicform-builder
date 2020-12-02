import { DEFAULT_INPUTS_O_INTEGER_INPUT } from 'ontimize-web-ngx';

import { InputMetadata } from '../../types/inputs-metadata.type';
import { OTextInputData } from './o-text-input.data';

export class OIntegerInputData extends OTextInputData {

  public getDirective(): string {
    return super.getOverridedDirective() || 'o-integer-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_INTEGER_INPUT;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'min',
      type: 'number',
      label: 'min',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'max',
      type: 'number',
      label: 'max',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'step',
      type: 'number',
      label: 'step',
      tooltip: '',
      default: 1,
      required: false
    }, {
      input: 'grouping',
      type: 'boolean',
      label: 'grouping',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'thousand-separator',
      type: 'string',
      label: 'thousand-separator',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'locale',
      type: 'string',
      label: 'locale',
      tooltip: '',
      default: null,
      required: false
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

}
