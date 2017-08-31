import { DEFAULT_INPUTS_O_TEXTAREA_INPUT } from 'ontimize-web-ng2';
import { OComponentData } from '../o-component-data.class';

export class OTextareaInputData extends OComponentData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-textarea-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_TEXTAREA_INPUT;
  }

}
