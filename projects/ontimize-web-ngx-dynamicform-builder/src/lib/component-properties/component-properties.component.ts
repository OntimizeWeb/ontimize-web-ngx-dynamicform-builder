import { ViewEncapsulation } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { PropertyMetadataClass } from '../components-metadata/property.metadata.class';
import { OComponentData } from '../ontimize-components-data/o-component-data.class';

@Component({
  selector: 'component-properties',
  templateUrl: './component-properties.component.html',
  styleUrls: ['./component-properties.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.component-properties]': 'true'
  }
})
export class ComponentPropertiesComponent implements OnInit, OnDestroy {

  public component: OComponentData;
  public templateInputsData = {};

  public formGroup: FormGroup;
  public formDataCache: any;

  public componentInputs$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({});
    this.formGroup.valueChanges.subscribe((value: any) => {
      if (this.formDataCache === undefined) {
        this.formDataCache = {};
      }
      Object.assign(this.formDataCache, value);
    });
  }

  ngOnDestroy(): void {
    this.formDataCache = undefined;
  }

  protected setTemplateInputsData(): void {
    const inputsData = this.component.getTemplateInputsData();
    const clonedInputsData = JSON.parse(JSON.stringify(inputsData));
    this.templateInputsData = clonedInputsData;
  }

  public setComponent(component: OComponentData): void {
    this.component = component;

    this.setTemplateInputsData();
    
    // Display only supported inputs
    this.componentInputs$.next(this.component.getInputs().filter(input => {
      const result = this.templateInputsData[input];
      if (!result) {
        console.info('Attribute `' + input + '` from `' + component.getDirective() + '` is not supported on DynamicForm Builder');
      }
      return result;
    }));
  }

  public comparePropertyType(prop, type): boolean {
    const propertyType = this.templateInputsData.hasOwnProperty(prop) ? this.templateInputsData[prop].type : undefined;
    if (type === 'text') {
      return (propertyType === 'string' || propertyType === 'number' || propertyType === 'json');
    }
    return (propertyType === type);
  }

  public getInputData(inputName): any {
    const inputData = this.templateInputsData[inputName];
    let configuredValue = this.component.getConfiguredInputValue(inputName);
    // TODO: buscar la forma de parsear los datos en otro sitio
    if (inputData.type === 'json') {
      configuredValue = JSON.stringify(configuredValue);
    }
    if (configuredValue !== undefined) {
      inputData.default = configuredValue;
    }
    return inputData;
  }

  public registerFormControlComponent(comp: PropertyMetadataClass): void {
    if (comp) {
      const control: FormControl = comp.getFormControl();
      if (control) {
        this.formGroup.addControl(comp.getPropertyName(), control);
      }
    }
  }

  public unregisterFormControlComponent(comp: PropertyMetadataClass): void {
    if (comp) {
      const control: FormControl = comp.getFormControl();
      if (control) {
        this.formGroup.removeControl(comp.getPropertyName());
      }
    }
  }

  public save(): void {
    Object.keys(this.formGroup.controls).forEach(control => this.formGroup.controls[control].markAsTouched());

    if (!this.formGroup.valid) {
      console.error('ERROR_MESSAGES.FORM_VALIDATION_ERROR');
      return;
    }

    const configuredInputs = {};
    if (this.formDataCache) {
      const keys = Object.keys(this.formDataCache);
      keys.forEach(item => {
        const propertyValue = this.formDataCache[item];
        if (this.templateInputsData[item].default !== propertyValue) {
          configuredInputs[item] = propertyValue;
          if (propertyValue !== undefined && typeof propertyValue !== 'string') {
            configuredInputs[item] = propertyValue.toString();
          }
          // TODO: buscar la forma de parsear los datos en otro sitio
          if (this.templateInputsData[item].type === 'json') {
            configuredInputs[item] = JSON.parse(propertyValue);
          }
        }
      });
    }
    this.component.setConfiguredInputs(configuredInputs);
  }

}
