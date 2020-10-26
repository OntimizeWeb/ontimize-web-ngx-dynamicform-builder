import { DEFAULT_INPUTS_O_COMBO } from 'ontimize-web-ngx';

import { InputMetadata } from '../../types/inputs-metadata.type';
import { OComponentFormDataService } from './o-component-form-data-service.class';

export class OComboData extends OComponentFormDataService {

  public getDirective(): string {
    return 'o-combo';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_COMBO;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'translate',
      type: 'boolean',
      label: 'translate',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'null-selection',
      type: 'boolean',
      label: 'null-selection',
      tooltip: '',
      default: true,
      required: true
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

}
