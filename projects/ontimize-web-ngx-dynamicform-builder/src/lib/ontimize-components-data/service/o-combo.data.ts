import { DEFAULT_INPUTS_O_COMBO } from 'ontimize-web-ngx';

import { OComponentFormDataService } from './o-component-form-data-service.class';

export class OComboData extends OComponentFormDataService {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-combo';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_COMBO;
  }

  public getTemplateInputsData(): any {
    const templateInputsData = super.getTemplateInputsData();
    templateInputsData['translate'] = {
      type: 'boolean',
      label: 'translate',
      tooltip: '',
      default: false,
      required: false
    };
    templateInputsData['null-selection'] = {
      type: 'boolean',
      label: 'null-selection',
      tooltip: '',
      default: true,
      required: true
    };
    return templateInputsData;
  }

}
