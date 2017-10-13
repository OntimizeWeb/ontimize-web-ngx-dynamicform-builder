import { DEFAULT_INPUTS_O_LIST } from 'ontimize-web-ngx';
import { OComponentDataService } from './o-component-data-service.class';

export class OListData extends OComponentDataService {

  constructor() {
    super();
  }

  isContainer(): Boolean {
    return true;
  }

  getDirective() {
    return 'o-list';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_LIST;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['quick-filter'] = {
      'type': 'boolean',
      'label': 'quick-filter',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['quick-filter-columns'] = {
      'type': 'string',
      'label': 'quick-filter-columns',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['refresh-button'] = {
      'type': 'boolean',
      'label': 'refresh-button',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['route'] = {
      'type': 'string',
      'label': 'route',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['selectable'] = {
      'type': 'boolean',
      'label': 'selectable',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['dense'] = {
      'type': 'boolean',
      'label': 'dense',
      'tooltip': '',
      'default': false,
      'required': false
    };
    return templateInputsData;
  }

}
