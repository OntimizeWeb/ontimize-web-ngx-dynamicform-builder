import { InputMetadata } from '../../types/inputs-metadata.type';
import { OComponentData } from '../o-component-data.class';

export class OComponentDataService extends OComponentData {

  public getBasicInputs(): string[] {
    const result = super.getBasicInputs();
    result.push(...['entity', 'service', 'columns', 'keys', 'parent-keys']);
    return result;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'title',
      type: 'string',
      label: 'title',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'css-class',
      type: 'string',
      label: 'css-class',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'visible',
      type: 'boolean',
      label: 'visible',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'enabled',
      type: 'boolean',
      label: 'enabled',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'controls',
      type: 'boolean',
      label: 'controls',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'service',
      type: 'string',
      label: 'service',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'entity',
      type: 'string',
      label: 'entity',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'query-method',
      type: 'string',
      label: 'query-method',
      tooltip: '',
      default: 'query',
      required: false
    }, {
      input: 'paginated-query-method',
      type: 'string',
      label: 'paginated-query-method',
      tooltip: '',
      default: 'advancedQuery',
      required: false
    }, {
      input: 'delete-method',
      type: 'string',
      label: 'delete-method',
      tooltip: '',
      default: 'delete',
      required: false
    }, {
      input: 'query-on-init',
      type: 'boolean',
      label: 'query-on-init',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'query-on-bind',
      type: 'boolean',
      label: 'query-on-bind',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'pageable',
      type: 'boolean',
      label: 'pageable',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'columns',
      type: 'string',
      label: 'columns',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'keys',
      type: 'string',
      label: 'keys',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'parent-keys',
      type: 'string',
      label: 'parent-keys',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'static-data',
      type: 'json',
      label: 'static-data',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'detail-mode',
      type: 'combo',
      label: 'detail-mode',
      tooltip: '',
      default: 'none',
      required: false,
      'values': [
        'none',
        'click',
        'doubleclick'
      ]
    }, {
      input: 'detail-form-route',
      type: 'string',
      label: 'detail-form-route',
      tooltip: '',
      default: 'detail',
      required: false
    }, {
      input: 'recursive-detail',
      type: 'boolean',
      label: 'recursive-detail',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'detail-button-in-row',
      type: 'boolean',
      label: 'detail-button-in-row',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'detail-button-in-row-icon',
      type: 'string',
      label: 'detail-button-in-row-icon',
      tooltip: '',
      default: 'mode_edit',
      required: false
    }, {
      input: 'edit-form-route',
      type: 'string',
      label: 'edit-form-route',
      tooltip: '',
      default: 'edit',
      required: false
    }, {
      input: 'recursive-edit',
      type: 'boolean',
      label: 'recursive-edit',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'edit-button-in-row',
      type: 'boolean',
      label: 'edit-button-in-row',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'edit-button-in-row-icon',
      type: 'string',
      label: 'edit-button-in-row-icon',
      tooltip: '',
      default: 'search',
      required: false
    }, {
      input: 'query-rows',
      type: 'number',
      label: 'query-rows',
      tooltip: '',
      default: 10,
      required: false
    }, {
      input: 'insert-button',
      type: 'boolean',
      label: 'insert-button',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'row-height',
      type: 'combo',
      label: 'row-height',
      tooltip: '',
      default: null,
      required: false,
      'values': [
        'small',
        'medium',
        'large'
      ]
    }, {
      input: 'service-type',
      type: 'string',
      label: 'service-type',
      tooltip: '',
      default: null,
      required: false
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

}
