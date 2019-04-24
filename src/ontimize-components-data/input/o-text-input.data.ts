import { DEFAULT_INPUTS_O_TEXT_INPUT } from 'ontimize-web-ngx';

import { OComponenetDataInput } from './o-component-data-input.class';

export class OTextInputData extends OComponenetDataInput {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-text-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_TEXT_INPUT;
  }

  public getTemplateInputsData(): any {
    const templateInputsData = super.getTemplateInputsData();
    templateInputsData['min-length'] = {
      type: 'number',
      label: 'min-length',
      tooltip: '',
      default: -1,
      required: false
    };
    templateInputsData['max-length'] = {
      type: 'number',
      label: 'max-length',
      tooltip: '',
      default: -1,
      required: false
    };
    return templateInputsData;
  }

}
