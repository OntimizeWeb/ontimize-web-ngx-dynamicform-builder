import { DEFAULT_INPUTS_O_LIST_ITEM_CARD } from 'ontimize-web-ngx';
import { OComponentData } from '../o-component-data.class';

export class OListItemCardData extends OComponentData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-list-item-card';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_LIST_ITEM_CARD;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    delete templateInputsData['attr'];
    templateInputsData['title'] = {
      'type': 'string',
      'label': 'title',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['subtitle'] = {
      'type': 'string',
      'label': 'subtitle',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['image'] = {
      'type': 'string',
      'label': 'image',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['action-1-text'] = {
      'type': 'string',
      'label': 'action-1-text',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['action-2-text'] = {
      'type': 'string',
      'label': 'action-2-text',
      'tooltip': '',
      'default': null,
      'required': false
    };
    return templateInputsData;
  }

}
