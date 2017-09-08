import { DEFAULT_INPUTS_O_COMBO } from 'ontimize-web-ng2';
import { OComponentDataService } from './o-component-data-service.class';

export class OComboData extends OComponentDataService {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-combo';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_COMBO;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['translate'] = {
      'type': 'boolean',
      'label': 'translate',
      'tooltip': '',
      'default': null,
      'required': false
    };
    return templateInputsData;
  }

}
