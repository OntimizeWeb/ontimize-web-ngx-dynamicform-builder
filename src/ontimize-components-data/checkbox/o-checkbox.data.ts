import { DEFAULT_INPUTS_O_CHECKBOX } from 'ontimize-web-ngx';

import { OComponenetDataInput } from '../input/o-component-data-input.class';

export class OCheckboxData extends OComponenetDataInput {

  constructor() {
    super();
  }

  public getDirective(): string {
    return 'o-checkbox';
  }

  public getInputsProperties(): string[] {
    return DEFAULT_INPUTS_O_CHECKBOX;
  }

  public getTemplateInputsData(): any {
    const templateInputsData = super.getTemplateInputsData();
    templateInputsData['data'] = {
      type: 'boolean',
      label: 'data',
      tooltip: '',
      default: false,
      required: false
    };
    templateInputsData['sql-type'] = {
      type: 'combo',
      label: 'sql-type',
      tooltip: '',
      default: 'BOOLEAN',
      required: true,
      values: [
        'BOOLEAN'
      ]
    };
    templateInputsData['true-value'] = {
      type: 'string',
      label: 'true-value',
      tooltip: '',
      default: true,
      required: true
    };
    templateInputsData['false-value'] = {
      type: 'string',
      label: 'false-value',
      tooltip: '',
      default: false,
      required: true
    };
    templateInputsData['boolean-type'] = {
      type: 'combo',
      label: 'boolean-type',
      tooltip: '',
      default: 'boolean',
      required: true,
      values: ['number', 'boolean', 'string']
    };
    return templateInputsData;
  }

}
