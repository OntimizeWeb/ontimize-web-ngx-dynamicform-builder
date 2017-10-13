import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ValidatorFn } from '@angular/forms/src/directives/validators';

export const DEFAULT_INPUTS_METADATA = [
  'parent',
  'property',
  'data'
];

export class PropertyMetadataClass {

  public static DEFAULT_INPUTS_METADATA = DEFAULT_INPUTS_METADATA;

  parent: FormGroup;
  property: string;
  data: any;
  fControl: FormControl;
  value: any;

  initialize() {
    this.registerFormListeners();
  }

  registerFormListeners() {
    let control: FormControl = this.getFormControl();
    if (control) {
      this.parent.addControl(this.getPropertyName(), control);
    }
  }

  destroy() {
    this.unregisterFormListeners();
  }

  unregisterFormListeners() {
    let control: FormControl = this.getFormControl();
    if (control) {
      this.parent.removeControl(this.getPropertyName());
    }
  }

  getFormGroup(): any {
    return this.parent;
  }

  getPropertyName(): string {
    if (this.property) {
      return this.property;
    }
    return undefined;
  }

  getValue(): any {
    if (this.value) {
      return this.value.value;
    }
    return this.parseValue(this.data.default);
  }

  parseValue(arg) {
    return arg;
  }

  getFormControl(): FormControl {
    if (!this.fControl) {
      let validators: ValidatorFn[] = this.resolveValidators();
      let cfg = {
        value: (this.data && this.data.default) ? this.data.default : undefined
      };
      this.fControl = new FormControl(cfg, validators);
    }
    return this.fControl;
  }

  resolveValidators(): ValidatorFn[] {
    let validators: ValidatorFn[] = [];
    if (this.data.required) {
      validators.push(Validators.required);
    }
    return validators;
  }

  get isValid() {
    if (this.fControl) {
      return this.fControl.valid;
    }
    return false;
  }

  innerOnChange(value: any) {
    this.value = { value: value };
  }

}
