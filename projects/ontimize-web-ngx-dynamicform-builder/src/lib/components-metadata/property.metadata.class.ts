import { forwardRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { ComponentPropertiesComponent } from '../component-properties/component-properties.component';
import { ComponentsAttrsService } from '../services/components-attrs.service';
import { InputMetadata } from '../types/inputs-metadata.type';

export const DEFAULT_INPUTS_METADATA = [
  'metadata'
];

export class PropertyMetadataClass implements OnInit, OnDestroy {

  public metadata: InputMetadata;
  public fControl: FormControl;

  protected subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(forwardRef(() => ComponentPropertiesComponent))
    protected propertiesComponent: ComponentPropertiesComponent,
    protected componentsAttrsService: ComponentsAttrsService
  ) { }

  ngOnInit() {
    this.createFormControl();
    this.registerFormListeners();
  }

  ngOnDestroy() {
    this.unregisterFormListeners();
  }

  private createFormControl() {
    const validators: ValidatorFn[] = this.resolveValidators();
    const value = (this.metadata && this.metadata.default) ? this.metadata.default : undefined;
    const cfg = {
      value: this.parseValue(value),
      disabled: false
    };
    this.fControl = new FormControl(cfg, validators);
  }

  protected getValueChangesObservable(): Observable<any> {
    return this.fControl.valueChanges;
  }

  private registerFormListeners(): void {
    if (this.propertiesComponent) {
      this.propertiesComponent.registerFormControlComponent(this);
    }
    this.subscriptions.add(this.getValueChangesObservable().subscribe((value: any) => {
      if (this.fControl.valid) {
        this.fControl.parent.updateValueAndValidity();
        this.propertiesComponent.save(this.metadata.input, value);
      }
    }));
  }

  private unregisterFormListeners(): void {
    if (this.propertiesComponent) {
      this.propertiesComponent.unregisterFormControlComponent(this);
    }
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  public getFormGroup(): any {
    return this.propertiesComponent.formGroup;
  }

  public getPropertyName(): string {
    if (this.metadata.input) {
      return this.metadata.input;
    }
    return undefined;
  }

  public parseValue(arg: any): any {
    return arg;
  }

  public resolveValidators(): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (this.metadata.required) {
      validators.push(Validators.required);
    }
    if (this.metadata.input === 'attr') {
      validators.push(this.uniqueAttrValidator.bind(this));
    }
    return validators;
  }

  get isValid(): boolean {
    if (this.fControl) {
      return this.fControl.valid;
    }
    return false;
  }

  public uniqueAttrValidator(control: FormControl): ValidationErrors {
    if (control.value &&
      control.value.length > 0 &&
      this.metadata.default !== control.value &&
      !this.componentsAttrsService.isAttrUnique(control.value)) {

      return { repeatedAttr: true };
    }
    return {};
  }
}
