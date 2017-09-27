import { /*DEFAULT_INPUTS_O_DATATABLE*/ } from 'ontimize-web-ngx-datatable';
import { OComponentDataService } from './o-component-data-service.class';

export class ODataTableData extends OComponentDataService {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-datatable';
  }

  getInputsProperties(): Array<any> {
    // return DEFAULT_INPUTS_O_DATATABLE;
    // TODO: investigate why DEFAULT_INPUTS_O_DATATABLE is not imported properly
    return [
      'oattr: attr',
      'title',
      'cssClass: css-class',
      'ovisible: visible',
      'oenabled: enabled',
      'controls',
      'service',
      'entity',
      'queryMethod: query-method',
      'paginatedQueryMethod : paginated-query-method',
      'deleteMethod: delete-method',
      'queryOnInit: query-on-init',
      'queryOnBind: query-on-bind',
      'pageable',
      'columns',
      'keys',
      'parentKeys: parent-keys',
      'staticData: static-data',
      'detailMode: detail-mode',
      'detailFormRoute: detail-form-route',
      'recursiveDetail: recursive-detail',
      'detailButtonInRow: detail-button-in-row',
      'detailButtonInRowIcon: detail-button-in-row-icon',
      'editFormRoute: edit-form-route',
      'recursiveEdit: recursive-edit',
      'editButtonInRow: edit-button-in-row',
      'editButtonInRowIcon: edit-button-in-row-icon',
      'queryRows: query-rows',
      'insertButton: insert-button',
      'rowHeight : row-height',
      'serviceType : service-type',
      'insertMethod: insert-method',
      'updateMethod: update-method',
      'visibleColumns: visible-columns',
      'editableColumns: editable-columns',
      'editOnFocus: edit-on-focus',
      'sortColumns: sort-columns',
      'quickFilter: quick-filter',
      'deleteButton: delete-button',
      'refreshButton: refresh-button',
      'columnsVisibilityButton: columns-visibility-button',
      'columnsResizeButton: columns-resize-button',
      'columnsGroupButton: columns-group-button',
      'exportButton: export-button',
      'insertTable: insert-table',
      'editionMode: edition-mode',
      'showTableButtonsText: show-table-buttons-text',
      'selectAllCheckbox: select-all-checkbox',
      'singlePageMode : single-page-mode',
      'paginationControls : pagination-controls'
    ];
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['insert-method'] = {
      'type': 'string',
      'label': 'insert-method',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['update-method'] = {
      'type': 'string',
      'label': 'update-method',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['visible-columns'] = {
      'type': 'string',
      'label': 'visible-columns',
      'tooltip': '',
      'default': null,
      'required': true
    };
    templateInputsData['editable-columns'] = {
      'type': 'string',
      'label': 'editable-columns',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['edit-on-focus'] = {
      'type': 'boolean',
      'label': 'edit-on-focus',
      'tooltip': '',
      'default': true,
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
    templateInputsData['columns-resize-button'] = {
      'type': 'boolean',
      'label': 'columns-resize-button',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['columns-group-button'] = {
      'type': 'boolean',
      'label': 'columns-group-button',
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
    templateInputsData['insert-table'] = {
      'type': 'boolean',
      'label': 'insert-table',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['edition-mode'] = {
      'type': 'combo',
      'label': 'edition-mode',
      'tooltip': '',
      'default': false,
      'required': false,
      'values': [
        'inline',
        'empty'
      ]
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
    templateInputsData['single-page-mode'] = {
      'type': 'boolean',
      'label': 'single-page-mode',
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
    return templateInputsData;
  }

}
