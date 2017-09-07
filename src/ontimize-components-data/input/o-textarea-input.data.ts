import { DEFAULT_INPUTS_O_TEXTAREA_INPUT } from 'ontimize-web-ng2';
import { OTextInputData } from './o-text-input.data';

export class OTextareaInputData extends OTextInputData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-textarea-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_TEXTAREA_INPUT;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['columns'] = {
      'type': 'number',
      'label': 'columns',
      'tooltip': '',
      'default': 5,
      'required': false
    };
    templateInputsData['rows'] = {
      'type': 'number',
      'label': 'rows',
      'tooltip': '',
      'default': null,
      'required': false
    };
    return templateInputsData;
  }

}
