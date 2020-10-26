import { DEFAULT_INPUTS_O_TABLE } from 'ontimize-web-ngx';

import { InputMetadata } from '../../types/inputs-metadata.type';
import { OComponentDataService } from './o-component-data-service.class';

export class OTableData extends OComponentDataService {

  public getDirective(): string {
    return 'o-table';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_TABLE;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'insert-method',
      type: 'string',
      label: 'insert-method',
      tooltip: '',
      default: 'insert',
      required: false
    }, {
      input: 'update-method',
      type: 'string',
      label: 'update-method',
      tooltip: '',
      default: 'update',
      required: false
    }, {
      input: 'visible-columns',
      type: 'string',
      label: 'visible-columns',
      tooltip: '',
      default: '',
      required: false
    }, {
      input: '',
      type: 'number',
      label: '',
      tooltip: '',
      default: -1,
      required: false
    }, {
      input: 'editable-columns',
      type: 'string',
      label: 'editable-columns',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'sort-columns',
      type: 'string',
      label: 'sort-columns',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'quick-filter',
      type: 'boolean',
      label: 'quick-filter',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'delete-button',
      type: 'boolean',
      label: 'delete-button',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'refresh-button',
      type: 'boolean',
      label: 'refresh-button',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'columns-visibility-button',
      type: 'boolean',
      label: 'columns-visibility-button',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'export-button',
      type: 'boolean',
      label: 'export-button',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'show-table-buttons-text',
      type: 'boolean',
      label: 'show-table-buttons-text',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'select-all-checkbox',
      type: 'boolean',
      label: 'select-all-checkbox',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'pagination-controls',
      type: 'boolean',
      label: 'pagination-controls',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'filter-case-sensitive',
      type: 'boolean',
      label: 'filter-case-sensitive',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'fixed-header',
      type: 'boolean',
      label: 'fixed-header',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'show-title',
      type: 'boolean',
      label: 'show-title',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'edition-mode',
      type: 'combo',
      label: 'edition-mode',
      tooltip: '',
      default: 'none',
      required: false,
      values: [
        'none',
        'inline',
        'click',
        'dblclick'
      ]
    }, {
      input: 'selection-mode',
      type: 'combo',
      label: 'selection-mode',
      tooltip: '',
      default: -1,
      required: false,
      values: [
        'none',
        'simple',
        'multiple'
      ]
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

}
