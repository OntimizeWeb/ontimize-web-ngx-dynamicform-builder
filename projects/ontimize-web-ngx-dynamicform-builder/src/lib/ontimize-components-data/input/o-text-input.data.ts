import { DEFAULT_INPUTS_O_TEXT_INPUT } from 'ontimize-web-ngx';

import { InputMetadata } from '../../types/inputs-metadata.type';
import { OComponenetDataInput } from './o-component-data-input.class';

export class OTextInputData extends OComponenetDataInput {

  public getDirective(): string {
    return super.getOverridedDirective() || 'o-text-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_TEXT_INPUT;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'min-length',
      type: 'number',
      label: 'min-length',
      tooltip: '',
      default: -1,
      required: false
    }, {
      input: 'max-length',
      type: 'number',
      label: 'max-length',
      tooltip: '',
      default: -1,
      required: false
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

}
