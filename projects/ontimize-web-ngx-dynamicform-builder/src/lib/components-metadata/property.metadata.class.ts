import { forwardRef, Inject } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

import { ComponentPropertiesComponent } from '../component-properties/component-properties.component';

export const DEFAULT_INPUTS_METADATA = [
  'property',
  'data'
];

export class PropertyMetadataClass {

  public property: string;
  public data: any;
  public fControl: FormControl;
  public value: any;

  constructor(
    @Inject(forwardRef(() => ComponentPropertiesComponent))
    protected propertiesComponent: ComponentPropertiesComponent
  ) { }

  public initialize(): void {
    this.registerFormListeners();

  }

  public registerFormListeners(): void {
    if (this.propertiesComponent) {
      this.propertiesComponent.registerFormControlComponent(this);
    }
  }

  public destroy(): void {
    this.unregisterFormListeners();
  }

  public unregisterFormListeners(): void {
    if (this.propertiesComponent) {
      this.propertiesComponent.unregisterFormControlComponent(this);
    }
  }

  public getFormGroup(): any {
    return this.propertiesComponent.formGroup;
  }

  public getPropertyName(): string {
    if (this.property) {
      return this.property;
    }
    return undefined;
  }

  public getValue(): any {
    if (this.value) {
      return this.value.value;
    }
    return this.parseValue(this.data.default);
  }

  public parseValue(arg: any): any {
    return arg;
  }

  public getFormControl(): FormControl {
    if (!this.fControl) {
      const validators: ValidatorFn[] = this.resolveValidators();
      const cfg = {
        value: (this.data && this.data.default) ? this.data.default : undefined
      };
      this.fControl = new FormControl(cfg, validators);
    }
    return this.fControl;
  }

  public resolveValidators(): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (this.data.required) {
      validators.push(Validators.required);
    }
    return validators;
  }

  get isValid(): boolean {
    if (this.fControl) {
      return this.fControl.valid;
    }
    return false;
  }

  public innerOnChange(value: any): void {
    this.value = { value: value };
    // this.fControl.setValue({ value: value });
  }

}
