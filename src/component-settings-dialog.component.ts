import {
  Component,
  OnInit,
  OnDestroy,

  // Inject,
  // Injector,
  // forwardRef,
  // ElementRef,
  // EventEmitter,
  // Optional,
  // ViewChild,
  // NgModule,
  // ModuleWithProviders,
  // ViewEncapsulation
} from '@angular/core';


import {
  // MdDialog,
  MdDialogRef
} from '@angular/material';

import {
  FormGroup,
  FormControl
} from '@angular/forms';


// import { OFormModule } from 'ontimize-web-ng2';


import { PropertyMetadataClass } from './components-metadata/property.metadata.class';
import { ComponentsDataService } from './services/index';
import { OComponentData } from './ontimize-components-data/o-component-data.class';

@Component({
  moduleId: module.id,
  selector: 'component-settings-dialog',
  inputs: [
  ],
  templateUrl: 'component-settings-dialog.component.html',
  styleUrls: ['component-settings-dialog.component.css']
})

export class ComponentSettingsDialogComponent implements OnInit, OnDestroy {

  component: OComponentData;
  templateInputsData = {};
  formGroup: FormGroup;
  formDataCache: Object;

  constructor(
    public dialogRef: MdDialogRef<ComponentSettingsDialogComponent>,
    private componentsDataService: ComponentsDataService
  ) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({});
    var self = this;

    this.formGroup.valueChanges
      .subscribe((value: any) => {
        if (self.formDataCache === undefined) {
          self.formDataCache = {};
        }
        (<any>Object).assign(self.formDataCache, value);
      });

  }

  ngOnDestroy() {
    this.formDataCache = undefined;
  }

  registerFormControlComponent(comp: PropertyMetadataClass) {
    if (comp) {
      let control: FormControl = comp.getFormControl();
      if (control) {
        this.formGroup.addControl(comp.getPropertyName(), control);
      }
    }
  }

  unregisterFormControlComponent(comp: PropertyMetadataClass) {
    if (comp) {
      let control: FormControl = comp.getFormControl();
      if (control) {
        this.formGroup.removeControl(comp.getPropertyName());
      }
    }
  }

  setComponent(component: OComponentData) {
    this.component = component;
  }

  setTemplateInputsData(inputsData) {
    var clonedInputsData = JSON.parse(JSON.stringify(inputsData));
    this.templateInputsData = clonedInputsData;
  }

  save() {
    if (!this.formGroup.valid) {
      console.error('ERROR MESSAGES.FORM_VALIDATION_ERROR');
      return;
    }

    var self = this;
    let configuredInputs = {};
    if (this.formDataCache) {
      let keys = Object.keys(this.formDataCache);
      keys.map(item => {
        let propertyValue = this.formDataCache[item];
        if (self.templateInputsData[item].default !== propertyValue) {
          configuredInputs[item] = propertyValue;
          if (propertyValue !== undefined && typeof propertyValue !== 'string') {
            configuredInputs[item] = propertyValue.toString();
          }
        }
      });
    }
    this.component.setConfiguredInputs(configuredInputs);
    this.dialogRef.close(this.component);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  getInputData(inputName) {
    let inputData = this.templateInputsData[inputName];
    let configuredValue = this.component.getConfiguredInputValue(inputName);
    if (configuredValue !== undefined) {
      inputData.default = configuredValue;
    }
    return inputData;
  }

}
