import { DEFAULT_INPUTS_O_CHECKBOX } from 'ontimize-web-ngx';
import { OComponenetDataInput } from '../input/o-component-data-input.class';

export class OCheckboxData extends OComponenetDataInput {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-checkbox';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_CHECKBOX;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['data'] = {
      'type': 'boolean',
      'label': 'data',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['sql-type'] = {
      'type': 'combo',
      'label': 'sql-type',
      'tooltip': '',
      'default': 'BOOLEAN',
      'required': true,
      'values': [
        'BOOLEAN'
      ]
    };
    return templateInputsData;
  }

}
