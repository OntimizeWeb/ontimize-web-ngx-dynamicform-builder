import { DEFAULT_INPUTS_O_TEXT_INPUT } from 'ontimize-web-ngx';
import { OComponenetDataInput } from './o-component-data-input.class';

export class OTextInputData extends OComponenetDataInput {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-text-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_TEXT_INPUT;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['min-length'] = {
      'type': 'number',
      'label': 'min-length',
      'tooltip': '',
      'default': -1,
      'required': false
    };
    templateInputsData['max-length'] = {
      'type': 'number',
      'label': 'max-length',
      'tooltip': '',
      'default': -1,
      'required': false
    };
    return templateInputsData;
  }

}
