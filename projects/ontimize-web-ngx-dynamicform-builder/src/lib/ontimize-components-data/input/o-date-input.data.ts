import { DEFAULT_INPUTS_O_DATE_INPUT } from 'ontimize-web-ngx';

import { OTextInputData } from './o-text-input.data';

export class ODateInputData extends OTextInputData {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-date-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_DATE_INPUT;
  }

  public getTemplateInputsData(): any {
    const templateInputsData = super.getTemplateInputsData();
    templateInputsData['format'] = {
      type: 'string',
      label: 'format',
      tooltip: '',
      default: null,
      required: false
    };
    templateInputsData['locale'] = {
      type: 'string',
      label: 'locale',
      tooltip: '',
      default: null,
      required: false
    };
    templateInputsData['touch-ui'] = {
      type: 'boolean',
      label: 'touch-ui',
      tooltip: '',
      default: false,
      required: false
    };
    return templateInputsData;
  }

}
