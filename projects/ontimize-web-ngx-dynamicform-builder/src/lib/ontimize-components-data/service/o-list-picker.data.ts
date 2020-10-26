import { DEFAULT_INPUTS_O_LIST_PICKER } from 'ontimize-web-ngx';

import { InputMetadata } from '../../types/inputs-metadata.type';
import { OComponentFormDataService } from './o-component-form-data-service.class';

export class OListPickerData extends OComponentFormDataService {

  public getDirective(): string {
    return 'o-list-picker';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_LIST_PICKER;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'filter',
      type: 'boolean',
      label: 'filter',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'dialog-width',
      type: 'string',
      label: 'dialog-width',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'dialog-height',
      type: 'string',
      label: 'dialog-height',
      tooltip: '',
      default: null,
      required: false
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

}
