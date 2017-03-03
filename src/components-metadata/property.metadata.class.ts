import {
  Inject,
  forwardRef
} from '@angular/core';

import {
  FormControl,
  Validators
} from '@angular/forms';

import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { ComponentSettingsDialogComponent } from '../component-settings-dialog.component';

export const DEFAULT_INPUTS_METADATA = [
  'property',
  'data'
];

export class PropertyMetadataClass {
  public static DEFAULT_INPUTS_METADATA = DEFAULT_INPUTS_METADATA;

  property: string;
  data: any;
  fControl: FormControl;
  value: any;

  constructor(
    @Inject(forwardRef(() => ComponentSettingsDialogComponent))
    protected settingsDialog: ComponentSettingsDialogComponent
  ) {

  }

  initialize() {
    if (this.settingsDialog) {
      this.registerFormListeners();
    }
  }

  registerFormListeners() {
    if (this.settingsDialog) {
      this.settingsDialog.registerFormControlComponent(this);
    }
  }

  destroy() {
    this.unregisterFormListeners();
  }

  unregisterFormListeners() {
    if (this.settingsDialog) {
      this.settingsDialog.unregisterFormControlComponent(this);
    }
  }

  getFormGroup(): any {
    return this.settingsDialog.formGroup;
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

    // this.fControl.setValue({ value: value });
  }
}
