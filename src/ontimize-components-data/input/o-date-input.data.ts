import { DEFAULT_INPUTS_O_DATE_INPUT } from 'ontimize-web-ngx';
import { OTextInputData } from './o-text-input.data';

export class ODateInputData extends OTextInputData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-date-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_DATE_INPUT;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['format'] = {
      'type': 'string',
      'label': 'format',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['locale'] = {
      'type': 'string',
      'label': 'locale',
      'tooltip': '',
      'default': null,
      'required': false
    };
    return templateInputsData;
  }

}
