import {
  Component,
  OnDestroy
} from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { DialogService } from 'ontimize-web-ngx';

import { OComponentData } from './ontimize-components-data/o-component-data.class';

@Component({
  selector: 'component-settings-dialog',
  inputs: [],
  templateUrl: './component-settings-dialog.component.html',
  styleUrls: ['./component-settings-dialog.component.scss']
})
export class ComponentSettingsDialogComponent implements OnDestroy {

  GENERAL_FORM_KEY: string = 'GENERAL';

  step = 0;
  component: OComponentData;
  templateInputsData = {};
  childrenTemplateInputsData = {};
  formGroups: Object = {};
  formDataCaches: Object = {};

  constructor(
    public dialogRef: MdDialogRef<ComponentSettingsDialogComponent>,
    protected dialogService: DialogService
  ) { }

  getFormGroup(key: string): FormGroup {
    if (!this.formGroups[key]) {
      this.formGroups[key] = new FormGroup({});

      var self = this;
      this.formGroups[key].valueChanges
        .subscribe((value: any) => {
          if (self.formDataCaches[key] === undefined) {
            self.formDataCaches[key] = {};
          }
          (<any>Object).assign(self.formDataCaches[key], value);
        });
    }

    return this.formGroups[key];
  }

  ngOnDestroy() {
    this.formDataCaches = undefined;
  }

  setComponent(component: OComponentData) {
    this.component = component;
  }

  setTemplateInputsData(inputsData) {
    var clonedInputsData = JSON.parse(JSON.stringify(inputsData));
    this.templateInputsData = clonedInputsData;
  }

  setChildrenTemplateInputsData(directive: string, childrenInputsData) {
    var clonedChildrenInputsData = JSON.parse(JSON.stringify(childrenInputsData));
    this.childrenTemplateInputsData[directive] = clonedChildrenInputsData;
  }

  save() {
    Object.keys(this.formGroups).forEach(key => Object.keys(this.formGroups[key].controls).forEach(control => this.formGroups[key].controls[control].markAsTouched()));

    if (Object.keys(this.formGroups).some(key => !this.formGroups[key].valid)) {
      console.error('ERROR_MESSAGES.FORM_VALIDATION_ERROR');
      return;
    }

    Object.keys(this.formDataCaches).forEach(key => {
      let keys = Object.keys(this.formDataCaches[key]);
      let configuredInputs = {};
      keys.map(item => {
        let propertyValue = this.formDataCaches[key][item];
        let inputsData = {};
        if (this.GENERAL_FORM_KEY === key) {
          inputsData = this.templateInputsData[item];
        } else {
          inputsData = this.childrenTemplateInputsData[key][item];
        }
        if (inputsData['default'] !== propertyValue || inputsData['required']) {
          configuredInputs[item] = propertyValue;
          if (propertyValue !== undefined && typeof propertyValue !== 'string') {
            configuredInputs[item] = propertyValue.toString();
          }
          // TODO: buscar la forma de parsear los datos en otro sitio
          if (inputsData['type'] === 'json') {
            configuredInputs[item] = JSON.parse(propertyValue);
          }
        }
      });
      if (this.GENERAL_FORM_KEY === key) {
        this.component.setConfiguredInputs(configuredInputs);
      } else {
        // TODO: look for a propper way to match form data caches and component children
        this.component.getChildren()[0].setConfiguredInputs(configuredInputs);
      }
    });

    this.dialogRef.close(this.component);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  getInputData(inputName, directive?: string) {
    let inputData = this.templateInputsData[inputName];
    if (directive) {
      inputData = this.childrenTemplateInputsData[directive][inputName];
    }
    let configuredValue = this.component.getConfiguredInputValue(inputName);
    if (directive) {
      configuredValue = this.component.children[0] ? this.component.children[0].getConfiguredInputValue(inputName) : undefined;
    }
    // TODO: buscar la forma de parsear los datos en otro sitio
    if (inputData.type === 'json') {
      configuredValue = JSON.stringify(configuredValue);
    }
    if (configuredValue !== undefined) {
      inputData.default = configuredValue;
    }
    return inputData;
  }

  comparePropertyType(prop, type, directive?: string) {
    let propertyType = this.templateInputsData.hasOwnProperty(prop) ? this.templateInputsData[prop].type : undefined;
    if (directive) {
      propertyType = this.childrenTemplateInputsData[directive].hasOwnProperty(prop) ? this.childrenTemplateInputsData[directive][prop].type : undefined;
    }
    if (type === 'text') {
      return (propertyType === 'string' || propertyType === 'number' || propertyType === 'json');
    }
    return (propertyType === type);
  }

  deleteInnerComponent(index: number) {
    if (this.dialogService) {
      this.dialogService.confirm('DELETE', 'DELETE_CONFIM_TEXT').then(result => {
        if (result) {
          this.component.getChildren().remove(index);
          this.dialogRef.close(this.component);
        }
      });
    }
  }

}
