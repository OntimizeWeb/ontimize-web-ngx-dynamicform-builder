import { DEFAULT_INPUTS_O_TEXTAREA_INPUT } from 'ontimize-web-ngx';

import { InputMetadata } from '../../types/inputs-metadata.type';
import { OTextInputData } from './o-text-input.data';

export class OTextareaInputData extends OTextInputData {

  public getDirective(): string {
    return super.getOverridedDirective() || 'o-textarea-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_TEXTAREA_INPUT;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'columns',
      type: 'number',
      label: 'columns',
      tooltip: '',
      default: 5,
      required: false
    }, {
      input: 'rows',
      type: 'number',
      label: 'rows',
      tooltip: '',
      default: null,
      required: false
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

}
