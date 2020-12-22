import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService } from 'ontimize-web-ngx';

import { OComponentData } from '../ontimize-components-data/o-component-data.class';
import { InputMetadata } from '../types/inputs-metadata.type';
import { PropertyMetadataClass } from './components-metadata/property.metadata.class';

@Component({
  selector: 'component-properties',
  templateUrl: './component-properties.component.html',
  styleUrls: ['./component-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.component-properties]': 'true'
  }
})
export class ComponentPropertiesComponent implements OnInit, OnDestroy {

  public _component: OComponentData;
  public attr: string;

  public formGroup: FormGroup;

  public inputsMetadata: InputMetadata[] = [];
  public basicInputsMetadata: InputMetadata[] = [];
  public advancedInputsMetadata: InputMetadata[] = [];

  @Output() componentUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onAddPredefinedLayout: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeComponentSelector: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDeleteComponent: EventEmitter<string> = new EventEmitter<string>();

  protected selectedIndex: number = 0;

  protected dialogService: DialogService;

  constructor(
    protected injector: Injector,
    protected cd: ChangeDetectorRef
  ) {
    this.createFormGroup();
    this.dialogService = this.injector.get(DialogService);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  private clear() {
    this._component = null;
    this.attr = null;
    this.inputsMetadata = [];
    this.basicInputsMetadata = [];
    this.advancedInputsMetadata = [];
    this.cd.detectChanges();
  }

  protected createFormGroup() {
    this.formGroup = new FormGroup({}, { updateOn: 'blur' });
  }

  protected getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = this.component.getInputsMetadata();
    const clonedInputsData: InputMetadata[] = JSON.parse(JSON.stringify(inputsMetadata));
    clonedInputsData.forEach(metadata => {
      let configuredValue = this.component.getConfiguredInputValue(metadata.input);
      // TODO: buscar la forma de parsear los datos en otro sitio
      if (metadata.type === 'json') {
        configuredValue = JSON.stringify(configuredValue);
      }
      if (configuredValue !== undefined) {
        metadata.default = configuredValue;
      }
      metadata.editionType = metadata.type === 'string' || metadata.type === 'number' || metadata.type === 'json' ?
        'text' :
        metadata.type;
    });
    return clonedInputsData;
  }


  protected setInputsMetadata(): void {
    // Display only supported inputs
    const basicInputsMetadata: InputMetadata[] = [];
    const advancedInputsMetadata: InputMetadata[] = [];

    this.component.getInputs().forEach(input => {
      const inputMetadata = this.inputsMetadata.find(item => item.input === input);
      if (inputMetadata != null) {
        if (this._component.getBasicInputs().indexOf(input) !== -1) {
          basicInputsMetadata.push(inputMetadata);
        } else {
          advancedInputsMetadata.push(inputMetadata);
        }
      } else {
        console.info('Attribute `' + input + '` from `' + this._component.getDirective() + '` is not supported on DynamicForm Builder');
      }
    });

    this.basicInputsMetadata = basicInputsMetadata;
    this.advancedInputsMetadata = advancedInputsMetadata;
  }

  set component(component: OComponentData) {
    if (component == null) {
      this.clear();
      return;
    }
    this._component = component;
    this.attr = component.configuredInputs['attr'];

    this.inputsMetadata = this.getInputsMetadata();
    this.setInputsMetadata();

    this.cd.detectChanges();
  }

  get component(): OComponentData {
    return this._component;
  }

  public registerFormControlComponent(comp: PropertyMetadataClass): void {
    if (comp && comp.fControl) {
      this.formGroup.registerControl(comp.getPropertyName(), comp.fControl);
    }
  }

  public unregisterFormControlComponent(comp: PropertyMetadataClass): void {
    if (comp && comp.fControl) {
      this.formGroup.removeControl(comp.getPropertyName());
    }
  }

  public save(input: string, value: any): void {
    // Object.keys(this.formGroup.controls).forEach(control => this.formGroup.controls[control].markAsTouched());

    if (!this.formGroup.valid) {
      console.error('ERROR_MESSAGES.FORM_VALIDATION_ERROR');
      return;
    }
    const inputMetadata = this.inputsMetadata.find(item => item.input === input);
    if (!inputMetadata) {
      return;
    }

    if (inputMetadata.default !== value) {
      const configuredInputs: any = {};
      configuredInputs[input] = value;
      if (value != undefined && typeof value !== 'string') {
        configuredInputs[input] = value.toString();
      }
      // TODO: buscar la forma de parsear los datos en otro sitio
      if (inputMetadata.type === 'json') {
        configuredInputs[input] = JSON.parse(value);
      }

      this.component.setConfiguredInputs(configuredInputs);
      if (configuredInputs.attr != null) {
        this.attr = configuredInputs.attr;
      }

      this.componentUpdate.emit();
    }
  }


  addPredefinedLayout() {
    this.onAddPredefinedLayout.emit({
      mode: 'existingContainer',
      attr: this.component.getComponentAttr()
    });
  }

  changeComponentSelector() {
    this.onChangeComponentSelector.emit(this.component.getComponentAttr());
  }

  deleteComponent() {
    this.dialogService.confirm('CONFIRM', 'MESSAGES.CONFIRM_DELETE').then(res => {
      if (res === true) {
        this.onDeleteComponent.emit(this.component.getComponentAttr());
      }
    });

  }

  setActiveComponentsSelectors(index: number) {
    this.selectedIndex = index;
  }

  isActiveIndex(index: number): boolean {
    return this.selectedIndex === index;
  }

}
