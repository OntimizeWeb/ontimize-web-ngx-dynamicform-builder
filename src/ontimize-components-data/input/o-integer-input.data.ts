import { DEFAULT_INPUTS_O_INTEGER_INPUT } from 'ontimize-web-ngx';

import { OTextInputData } from './o-text-input.data';

export class OIntegerInputData extends OTextInputData {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-integer-input';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_INTEGER_INPUT;
  }

  public getTemplateInputsData(): any {
    const templateInputsData = super.getTemplateInputsData();
    templateInputsData['min'] = {
      type: 'number',
      label: 'min',
      tooltip: '',
      default: null,
      required: false
    };
    templateInputsData['max'] = {
      type: 'number',
      label: 'max',
      tooltip: '',
      default: null,
      required: false
    };
    templateInputsData['step'] = {
      type: 'number',
      label: 'step',
      tooltip: '',
      default: 1,
      required: false
    };
    templateInputsData['grouping'] = {
      type: 'boolean',
      label: 'grouping',
      tooltip: '',
      default: false,
      required: false
    };
    templateInputsData['thousand-separator'] = {
      type: 'string',
      label: 'thousand-separator',
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
    return templateInputsData;
  }

}
