import { DEFAULT_INPUTS_O_CHECKBOX } from 'ontimize-web-ngx';

import { InputMetadata } from '../../types/inputs-metadata.type';
import { OComponenetDataInput } from '../input/o-component-data-input.class';

export class OCheckboxData extends OComponenetDataInput {

  public getDirective(): string {
    return 'o-checkbox';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_CHECKBOX;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'data',
      type: 'boolean',
      label: 'data',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'sql-type',
      type: 'combo',
      label: 'sql-type',
      tooltip: '',
      default: 'BOOLEAN',
      required: true,
      values: [
        'BOOLEAN'
      ]
    }, {
      input: 'true-value',
      type: 'string',
      label: 'true-value',
      tooltip: '',
      default: true,
      required: true
    }, {
      input: 'false-value',
      type: 'string',
      label: 'false-value',
      tooltip: '',
      default: false,
      required: true
    }, {
      input: 'boolean-type',
      type: 'combo',
      label: 'boolean-type',
      tooltip: '',
      default: 'boolean',
      required: true,
      values: ['number', 'boolean', 'string']
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

}
