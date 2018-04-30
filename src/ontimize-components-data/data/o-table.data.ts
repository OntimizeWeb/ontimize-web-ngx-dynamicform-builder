import { DEFAULT_INPUTS_O_TABLE } from 'ontimize-web-ngx';
import { OComponentDataService } from './o-component-data-service.class';

export class OTableData extends OComponentDataService {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-table';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_TABLE;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['insert-method'] = {
      'type': 'string',
      'label': 'insert-method',
      'tooltip': '',
      'default': 'insert',
      'required': false
    };
    templateInputsData['update-method'] = {
      'type': 'string',
      'label': 'update-method',
      'tooltip': '',
      'default': 'update',
      'required': false
    };
    templateInputsData['visible-columns'] = {
      'type': 'string',
      'label': 'visible-columns',
      'tooltip': '',
      'default': '',
      'required': false
    };
    templateInputsData[''] = {
      'type': 'number',
      'label': '',
      'tooltip': '',
      'default': -1,
      'required': false
    };
    templateInputsData['editable-columns'] = {
      'type': 'string',
      'label': 'editable-columns',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['sort-columns'] = {
      'type': 'string',
      'label': 'sort-columns',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['quick-filter'] = {
      'type': 'boolean',
      'label': 'quick-filter',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['delete-button'] = {
      'type': 'boolean',
      'label': 'delete-button',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['refresh-button'] = {
      'type': 'boolean',
      'label': 'refresh-button',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['columns-visibility-button'] = {
      'type': 'boolean',
      'label': 'columns-visibility-button',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['export-button'] = {
      'type': 'boolean',
      'label': 'export-button',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['show-table-buttons-text'] = {
      'type': 'boolean',
      'label': 'show-table-buttons-text',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['select-all-checkbox'] = {
      'type': 'boolean',
      'label': 'select-all-checkbox',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['pagination-controls'] = {
      'type': 'boolean',
      'label': 'pagination-controls',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['filter-case-sensitive'] = {
      'type': 'boolean',
      'label': 'filter-case-sensitive',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['fixed-header'] = {
      'type': 'boolean',
      'label': 'fixed-header',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['show-title'] = {
      'type': 'boolean',
      'label': 'show-title',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['edition-mode'] = {
      'type': 'combo',
      'label': 'edition-mode',
      'tooltip': '',
      'default': 'none',
      'required': false,
      'values': [
        'none',
        'inline',
        'click',
        'dblclick'
      ]
    };
    templateInputsData['selection-mode'] = {
      'type': 'combo',
      'label': 'selection-mode',
      'tooltip': '',
      'default': -1,
      'required': false,
      'values': [
        'none',
        'simple',
        'multiple'
      ]
    };

    return templateInputsData;
  }

}
