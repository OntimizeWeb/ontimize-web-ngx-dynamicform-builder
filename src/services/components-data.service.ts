import { Injectable } from '@angular/core';

import { OCheckboxData, OColumnData, OComboData, OCurrencyInputData, ODateInputData, OEmailInputData, OIntegerInputData, OListPickerData, ONifInputData, OPasswordInputData, OPercentInputData, ORealInputData, ORowData, OTableData, OTextareaInputData, OTextInputData } from '../ontimize-components-data';
import { OComponentData } from '../ontimize-components-data/o-component-data.class';

@Injectable()
export class ComponentsDataService {

  public constructors = {
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
    'o-row': ORowData,
    'o-combo': OComboData,
    'o-list-picker': OListPickerData,
    'o-checkbox': OCheckboxData,
    'o-table': OTableData
  };

  public getOntimizeComponentData(componentName): OComponentData {
    if (this.constructors.hasOwnProperty(componentName)) {
      return new this.constructors[componentName]();
    }
    return new OComponentData();
  }

}
