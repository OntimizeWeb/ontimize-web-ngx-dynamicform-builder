import {
  Injectable
} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {
  OCurrencyInputData,
  ODateInputData,
  OEmailInputData,
  OIntegerInputData,
  ONifInputData,
  OPasswordInputData,
  OPercentInputData,
  ORealInputData,
  OTextInputData,
  OTextareaInputData,

  OColumnData,
  ORowData
} from '../ontimize-components-data/index';

import {
  OComponentData
} from '../ontimize-components-data/o-component-data.class';

import { COMPONENTS_INPUTS_DATA } from '../assets/components-inputs.data';

@Injectable()
export class ComponentsDataService {

  constructors = {
    'o-currency-input': OCurrencyInputData,
    'o-date-input': ODateInputData,
    'o-email-input': OEmailInputData,
    'o-integer-input': OIntegerInputData,
    'o-nif-input': ONifInputData,
    'o-password-input': OPasswordInputData,
    'o-percent-input': OPercentInputData,
    'o-real-input': ORealInputData,
    'o-text-input': OTextInputData,
    'o-textarea-input': OTextareaInputData,

    'o-column': OColumnData,
    'o-row': ORowData
  };

  instances = {};

  templateInputsData = null;

  getOntimizeComponentData(componentName): OComponentData {
    let res;
    if (this.constructors.hasOwnProperty(componentName)) {
      res = new this.constructors[componentName]();
    } else {
      res = new OComponentData();
    }
    return res;
  }

  readComponentsInputsData(): any {
    return COMPONENTS_INPUTS_DATA;
  }

  getComponentsInputsData() {
    if (this.templateInputsData === null) {
      this.setComponentInputsData(this.readComponentsInputsData());
    }
    return this.templateInputsData;
  }

  setComponentInputsData(inputsData) {
    let inputNames = Object.keys(inputsData.inputs);
    for (var i = 0; i < inputNames.length; i++) {
      let input = inputNames[i];
      if (inputsData.inputs[input].type === 'combo' &&
        inputsData['select-values'][input] !== undefined) {
        inputsData.inputs[input].values = inputsData['select-values'][input].values;
      }
    }
    this.templateInputsData = inputsData.inputs;
  }

}
