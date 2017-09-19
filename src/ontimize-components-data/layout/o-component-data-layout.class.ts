import { OComponentData } from '../o-component-data.class';

export class OComponentDataLayout extends OComponentData {

  isContainer(): Boolean {
    return true;
  }

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
      'type': 'combo',
      'label': 'layout-align',
      'tooltip': '',
      'default': 'start start',
      'required': false,
      'values': [
        'start start',
        'start center',
        'start end',
        'start stretch',
        'center start',
        'center center',
        'center end',
        'center stretch',
        'end start',
        'end center',
        'end end',
        'end stretch',
        'space-around start',
        'space-around center',
        'space-around end',
        'space-around stretch',
        'space-between start',
        'space-between center',
        'space-between end',
        'space-between stretch'
      ]
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
