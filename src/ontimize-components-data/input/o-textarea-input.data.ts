import { DEFAULT_INPUTS_O_TEXTAREA_INPUT } from 'ontimize-web-ngx';

import { OTextInputData } from './o-text-input.data';

export class OTextareaInputData extends OTextInputData {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-textarea-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_TEXTAREA_INPUT;
  }

  public getTemplateInputsData(): any {
    const templateInputsData = super.getTemplateInputsData();
    templateInputsData['columns'] = {
      type: 'number',
      label: 'columns',
      tooltip: '',
      default: 5,
      required: false
    };
    templateInputsData['rows'] = {
      type: 'number',
      label: 'rows',
      tooltip: '',
      default: null,
      required: false
    };
    return templateInputsData;
  }

}
