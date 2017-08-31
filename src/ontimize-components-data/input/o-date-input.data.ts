import { DEFAULT_INPUTS_O_DATE_INPUT } from 'ontimize-web-ng2';
import { OComponentData } from '../o-component-data.class';

export class ODateInputData extends OComponentData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-date-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_DATE_INPUT;
  }

}
