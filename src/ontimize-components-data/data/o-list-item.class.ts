// import { DEFAULT_INPUTS_O_TEXT_RENDERER } from 'ontimize-web-ngx';
import { OComponentData } from '../o-component-data.class';

export class OListItemData extends OComponentData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-list-item';
  }

  // getInputsProperties(): Array<any> {
  //   return DEFAULT_INPUTS_O_TEXT_RENDERER;
  // }

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
    templateInputsData['primary-text'] = {
      'type': 'string',
      'label': 'primary-text',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['secondary-text'] = {
      'type': 'string',
      'label': 'secondary-text',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['icon'] = {
      'type': 'string',
      'label': 'icon',
      'tooltip': '',
      'default': null,
      'required': false
    };
    return templateInputsData;
  }

}
