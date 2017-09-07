import { OComponentData } from '../o-component-data.class';

export class OComponentDataLayout extends OComponentData {

  getTemplateInputsData() {
    return {
      'attr': {
        'type': 'string',
        'label': 'attr',
        'tooltip': '',
        'default': null,
        'required': true
      },
      'title-label': {
        'type': 'string',
        'label': 'title-label',
        'tooltip': '',
        'default': null,
        'required': false
      },
      'layout-align': {
        'type': 'string',
        'label': 'layout-align',
        'tooltip': '',
        'default': 'start start',
        'required': false
      },
      'layout-fill': {
        'type': 'boolean',
        'label': 'layout-fill',
        'tooltip': '',
        'default': false,
        'required': false
      },
      'elevation': {
        'type': 'number',
        'label': 'elevation',
        'tooltip': '',
        'default': 0,
        'required': false
      }
    };
  }

}
