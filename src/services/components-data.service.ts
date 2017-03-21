import {
  Injectable
} from '@angular/core';

import {
  Http
  // ,
  // Headers
} from '@angular/http';

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
  ORowData,
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

  constructor(protected http: Http) {
  }

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
    // var headers: Headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Content-Type', 'application/json;charset=UTF-8');
    // return this.http
    //   .get('src/assets/components-inputs-data.json', { headers: headers })
    //   .map((res: any) => res.json());
    return COMPONENTS_INPUTS_DATA;
  }

  getComponentsInputsData() {
    var self = this;
    var p = new Promise<string>((resolve, reject) => {
      if (self.templateInputsData === null) {
        // self.readComponentsInputsData()
        //   .subscribe(
        //   menuData => {
        let menuData = self.readComponentsInputsData();
        self.setComponentInputsData(menuData);
        resolve(self.templateInputsData);
        // },
        // err => {
        //   reject(err);
        // });
      } else {
        resolve(self.templateInputsData);
      }
    });
    return p;
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
