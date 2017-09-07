import { DEFAULT_INPUTS_O_ROW } from 'ontimize-web-ng2';
import { OComponentDataLayout } from './o-component-data-layout.class';

export class ORowData extends OComponentDataLayout {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-row';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_ROW;
  }

  isContainer(): Boolean {
    return true;
  }

}
