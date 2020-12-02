import { InputMetadata } from '../../types/inputs-metadata.type';
import { OComponenetDataInput } from '../input/o-component-data-input.class';

export class OComponentFormDataService extends OComponenetDataInput {

  public getBasicInputs(): string[] {
    const result = super.getBasicInputs();
    result.push(...['entity', 'service', 'value-column', 'parent-keys', 'visible-columns', 'description-columns']);
    return result;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'static-data',
      type: 'json',
      label: 'static-data',
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
      input: 'service',
      type: 'string',
      label: 'service',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'columns',
      type: 'string',
      label: 'columns',
      tooltip: '',
      default: null,
      required: true
    }, {
      input: 'value-column',
      type: 'string',
      label: 'value-column',
      tooltip: '',
      default: null,
      required: true
    }, {
      input: 'value-column-type',
      type: 'string',
      label: 'value-column-type',
      tooltip: '',
      default: 'int',
      required: true
    }, {
      input: 'parent-keys',
      type: 'string',
      label: 'parent-keys',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'visible-columns',
      type: 'string',
      label: 'visible-columns',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'description-columns',
      type: 'string',
      label: 'description-columns',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'separator',
      type: 'string',
      label: 'separator',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'query-on-init',
      type: 'boolean',
      label: 'query-on-init',
      tooltip: '',
      default: true,
      required: true
    }, {
      input: 'query-on-bind',
      type: 'boolean',
      label: 'query-on-bind',
      tooltip: '',
      default: false,
      required: true
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

  public getAvailableSelectorsToChange(): string[] {
    return null;
  }
}
