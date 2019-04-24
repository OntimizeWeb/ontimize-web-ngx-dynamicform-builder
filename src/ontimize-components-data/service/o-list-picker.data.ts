import { DEFAULT_INPUTS_O_LIST_PICKER } from 'ontimize-web-ngx';

import { OComponentFormDataService } from './o-component-form-data-service.class';

export class OListPickerData extends OComponentFormDataService {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-list-picker';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_LIST_PICKER;
  }

  public getTemplateInputsData(): any {
    const templateInputsData = super.getTemplateInputsData();
    templateInputsData['filter'] = {
      type: 'boolean',
      label: 'filter',
      tooltip: '',
      default: true,
      required: false
    };
    templateInputsData['dialog-width'] = {
      type: 'string',
      label: 'dialog-width',
      tooltip: '',
      default: null,
      required: false
    };
    templateInputsData['dialog-height'] = {
      type: 'string',
      label: 'dialog-height',
      tooltip: '',
      default: null,
      required: false
    };
    return templateInputsData;
  }

}
