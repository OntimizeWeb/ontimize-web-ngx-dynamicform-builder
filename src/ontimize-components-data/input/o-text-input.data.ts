import { DEFAULT_INPUTS_O_TEXT_INPUT } from 'ontimize-web-ng2/ontimize';
import { OComponentData } from '../o-component-data.class';

export class OTextInputData extends OComponentData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-text-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_TEXT_INPUT;
  }
}
