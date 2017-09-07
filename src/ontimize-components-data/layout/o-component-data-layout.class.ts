import { OComponentData } from '../o-component-data.class';

export class OComponentDataLayout extends OComponentData {

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['title-label'] = {
      'type': 'string',
      'label': 'title-label',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['layout-align'] = {
      'type': 'string',
      'label': 'layout-align',
      'tooltip': '',
      'default': 'start start',
      'required': false
    };
    templateInputsData['layout-fill'] = {
      'type': 'boolean',
      'label': 'layout-fill',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['elevation'] = {
      'type': 'number',
      'label': 'elevation',
      'tooltip': '',
      'default': 0,
      'required': false
    };
    return templateInputsData;
  }

}
