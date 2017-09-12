import { DEFAULT_INPUTS_O_LIST_PICKER } from 'ontimize-web-ng2';
import { OComponentDataService } from './o-component-data-service.class';

export class OListPickerData extends OComponentDataService {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-list-picker';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_LIST_PICKER;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['filter'] = {
      'type': 'boolean',
      'label': 'filter',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['dialog-width'] = {
      'type': 'string',
      'label': 'dialog-width',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['dialog-height'] = {
      'type': 'string',
      'label': 'dialog-height',
      'tooltip': '',
      'default': null,
      'required': false
    };
    return templateInputsData;
  }

}
