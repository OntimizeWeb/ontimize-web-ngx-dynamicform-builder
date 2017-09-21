import { OComponentData } from '../o-component-data.class';

export class OComponentDataService extends OComponentData {

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    // TODO: remove 'title' property for 'o-table' component
    templateInputsData['title'] = {
      'type': 'string',
      'label': 'title',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['css-class'] = {
      'type': 'string',
      'label': 'css-class',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['visible'] = {
      'type': 'boolean',
      'label': 'visible',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['enabled'] = {
      'type': 'boolean',
      'label': 'enabled',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['controls'] = {
      'type': 'boolean',
      'label': 'controls',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['service'] = {
      'type': 'string',
      'label': 'service',
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
    templateInputsData['query-method'] = {
      'type': 'string',
      'label': 'query-method',
      'tooltip': '',
      'default': 'query',
      'required': false
    };
    templateInputsData['paginated-query-method'] = {
      'type': 'string',
      'label': 'paginated-query-method',
      'tooltip': '',
      'default': 'advancedQuery',
      'required': false
    };
    templateInputsData['delete-method'] = {
      'type': 'string',
      'label': 'delete-method',
      'tooltip': '',
      'default': 'delete',
      'required': false
    };
    templateInputsData['query-on-init'] = {
      'type': 'boolean',
      'label': 'query-on-init',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['query-on-bind'] = {
      'type': 'boolean',
      'label': 'query-on-bind',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['pageable'] = {
      'type': 'boolean',
      'label': 'pageable',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['columns'] = {
      'type': 'string',
      'label': 'columns',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['keys'] = {
      'type': 'string',
      'label': 'keys',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['parent-keys'] = {
      'type': 'string',
      'label': 'parent-keys',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['static-data'] = {
      'type': 'json',
      'label': 'static-data',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['detail-mode'] = {
      'type': 'combo',
      'label': 'detail-mode',
      'tooltip': '',
      'default': 'none',
      'required': false,
      'values': [
        'none',
        'click',
        'doubleclick'
      ]
    };
    templateInputsData['detail-form-route'] = {
      'type': 'string',
      'label': 'detail-form-route',
      'tooltip': '',
      'default': 'detail',
      'required': false
    };
    templateInputsData['recursive-detail'] = {
      'type': 'boolean',
      'label': 'recursive-detail',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['detail-button-in-row'] = {
      'type': 'boolean',
      'label': 'detail-button-in-row',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['detail-button-in-row-icon'] = {
      'type': 'string',
      'label': 'detail-button-in-row-icon',
      'tooltip': '',
      'default': 'mode_edit',
      'required': false
    };
    templateInputsData['edit-form-route'] = {
      'type': 'string',
      'label': 'edit-form-route',
      'tooltip': '',
      'default': 'edit',
      'required': false
    };
    templateInputsData['recursive-edit'] = {
      'type': 'boolean',
      'label': 'recursive-edit',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['edit-button-in-row'] = {
      'type': 'boolean',
      'label': 'edit-button-in-row',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['edit-button-in-row-icon'] = {
      'type': 'string',
      'label': 'edit-button-in-row-icon',
      'tooltip': '',
      'default': 'search',
      'required': false
    };
    templateInputsData['query-rows'] = {
      'type': 'number',
      'label': 'query-rows',
      'tooltip': '',
      'default': 10,
      'required': false
    };
    templateInputsData['insert-button'] = {
      'type': 'boolean',
      'label': 'insert-button',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['row-height'] = {
      'type': 'combo',
      'label': 'row-height',
      'tooltip': '',
      'default': null,
      'required': false,
      'values': [
        'small',
        'medium',
        'large'
      ]
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
