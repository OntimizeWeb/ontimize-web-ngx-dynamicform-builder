import { OComponenetDataInput } from '../input/o-component-data-input.class';

export class OComponentDataService extends OComponenetDataInput {

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['static-data'] = {
      'type': 'json',
      'label': 'static-data',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['entity'] = {
      'type': 'string',
      'label': 'entity',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['service'] = {
      'type': 'string',
      'label': 'service',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['columns'] = {
      'type': 'string',
      'label': 'columns',
      'tooltip': '',
      'default': null,
      'required': true
    };
    templateInputsData['value-column'] = {
      'type': 'string',
      'label': 'value-column',
      'tooltip': '',
      'default': null,
      'required': true
    };
    templateInputsData['parent-keys'] = {
      'type': 'string',
      'label': 'parent-keys',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['visible-columns'] = {
      'type': 'string',
      'label': 'visible-columns',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['description-columns'] = {
      'type': 'string',
      'label': 'description-columns',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['separator'] = {
      'type': 'string',
      'label': 'separator',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['query-on-init'] = {
      'type': 'boolean',
      'label': 'query-on-init',
      'tooltip': '',
      'default': true,
      'required': true
    };
    templateInputsData['query-on-bind'] = {
      'type': 'boolean',
      'label': 'query-on-bind',
      'tooltip': '',
      'default': false,
      'required': true
    };
    templateInputsData['service-type'] = {
      'type': 'string',
      'label': 'service-type',
      'tooltip': '',
      'default': null,
      'required': false
    };
    return templateInputsData;
  }

}
