import { DEFAULT_INPUTS_O_DATE_INPUT } from 'ontimize-web-ngx';

import { InputMetadata } from '../../types/inputs-metadata.type';
import { OTextInputData } from './o-text-input.data';

export class ODateInputData extends OTextInputData {

  public getDirective(): string {
    return 'o-date-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_DATE_INPUT;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'format',
      type: 'string',
      label: 'format',
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
    }, {
      input: 'touch-ui',
      type: 'boolean',
      label: 'touch-ui',
      tooltip: '',
      default: false,
      required: false
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

}
