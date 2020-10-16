import { Component, EventEmitter, forwardRef, HostBinding, Inject, OnInit, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import {
  IComponent,
  IFormDataComponent,
  IFormDataTypeComponent,
  InputConverter,
  OFormComponent,
  OFormValue,
  OValueChangeEvent,
  SQLTypes,
} from 'ontimize-web-ngx';
import { BaseComponent, ODynamicFormComponent } from 'ontimize-web-ngx-dynamicform';
import { BehaviorSubject } from 'rxjs';
import { ComponentPropertiesComponent } from './component-properties/component-properties.component';

import { ComponentSettingsDialogComponent } from './component-settings-dialog.component';
import { ComponentsMenuComponent } from './components-menu/components-menu.component';
import { OComponentData } from './ontimize-components-data/o-component-data.class';
import { ComponentsDataService } from './services/components-data.service';
import { ArrayList } from './utils/collections/ArrayList';

@Component({
  selector: 'o-dynamic-form-builder',
  templateUrl: './o-dynamic-form-builder.component.html',
  styleUrls: ['./o-dynamic-form-builder.component.scss'],
  inputs: [
    'oattr :attr',
    'autoBinding: automatic-binding',
    'autoRegistering: automatic-registering',
    'formDefinition: form-definition',
    'editMode: edit-mode'
  ],
  outputs: [
    'render',
    'onFormDefinitionUpdate'
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.o-dynamic-form-builder]': 'true'
  }
})

export class ODynamicFormBuilderComponent implements OnInit, IComponent, IFormDataTypeComponent, IFormDataComponent {

  @InputConverter()
  public autoBinding: boolean = true;
  @InputConverter()
  public autoRegistering: boolean = true;
  @InputConverter()
  public editMode: boolean = false;


  @HostBinding('style.flexDirection') get style_flexDirection() { return 'column'; }
  @HostBinding('style.display') get style_display() { return 'flex'; }

  public formDefinition$: BehaviorSubject<any> = new BehaviorSubject(null);
  public componentsArray: ArrayList<OComponentData> = new ArrayList<OComponentData>();

  public render: EventEmitter<any> = new EventEmitter();
  public onFormDefinitionUpdate: EventEmitter<Object> = new EventEmitter<Object>();

  public onChange: EventEmitter<object> = new EventEmitter<object>();
  public onValueChange: EventEmitter<OValueChangeEvent> = new EventEmitter<OValueChangeEvent>();

  protected oattr: string;
  protected innerFormDefinition: any = null;

  protected _isReadOnly: boolean;
  protected _fControl: FormControl;

  @ViewChild('innerForm', { static: false })
  protected innerForm: OFormComponent;
  @ViewChild('dynamicForm', { static: false })
  protected dynamicForm: ODynamicFormComponent;
  @ViewChild('appMenu', { static: false })
  protected appMenu: ComponentsMenuComponent;
  @ViewChild('componentProperties', { static: false })
  protected componentProperties: ComponentPropertiesComponent;

  constructor(
    protected dialog: MatDialog,
    protected componentsDataService: ComponentsDataService,
    @Optional() @Inject(forwardRef(() => OFormComponent)) protected parentForm: OFormComponent
  ) { }

  public ngOnInit(): void {
    // ensuring formControl creation
    this.getControl();

    const setDefaultDef = !this.formDefinition;
    if (setDefaultDef) {
      this.innerFormDefinition = {
        components: []
      };
    }
    if (this.parentForm) {
      this.registerFormListeners();
      this._isReadOnly = this.parentForm.isInInitialMode();
    } else {
      this._isReadOnly = false;
    }
  }

  public registerFormListeners(): void {
    if (this.parentForm) {
      this.parentForm.registerFormComponent(this);
      this.parentForm.registerFormControlComponent(this);
      this.parentForm.registerSQLTypeFormComponent(this);
    }
  }

  public ngOnDestroy(): void {
    this.unregisterFormListeners();
  }

  public unregisterFormListeners(): void {
    if (this.parentForm) {
      this.parentForm.unregisterFormComponent(this);
      this.parentForm.unregisterFormControlComponent(this);
      this.parentForm.unregisterSQLTypeFormComponent(this);
    }
  }

  public getValue(): any {
    // TO-DO
  }

  public clearValue(): void {
    // TO-DO
  }

  public setValue(val) {
    this.formDefinition = val;
  }

  public getAttribute(): string {
    if (this.oattr) {
      return this.oattr;
    }
    return undefined;
  }

  public getSQLType(): number {
    return SQLTypes.OTHER;
  }

  public reloadInnerFormMode(): void {
    // re-setting wrapper form mode for setting mode to new components
    this.innerForm.setFormMode(this.innerForm.mode);
  }

  public onDynamicFormRendered(): void {
    this.reloadInnerFormMode();
    if (this.render) {
      this.render.emit(true);
    }
  }

  set data(value: any) {
    let formDef: any;
    if (value instanceof OFormValue) {
      formDef = value.value;
    }
    if (!formDef) {
      formDef = {
        components: []
      };
    }
    this.formDefinition = formDef;
  }

  public isAutomaticBinding(): boolean {
    return this.autoBinding;
  }

  public isAutomaticRegistering(): boolean {
    return this.autoRegistering;
  }

  public getComponentsFromJSON(componentsJSON, parent): void {
    for (var i = 0; i < componentsJSON.length; i++) {
      const comp = Object.assign({}, componentsJSON[i]);
      if (comp.hasOwnProperty('ontimize-directive')) {
        const compData = this.componentsDataService.getOntimizeComponentData(comp['ontimize-directive']);

        delete comp['ontimize-directive'];
        compData.setConfiguredInputs(comp);

        if (compData.isContainer() && comp.hasOwnProperty('children') && comp.children.length) {
          this.getComponentsFromJSON(comp.children, compData.children);
        }
        parent.push(compData);
      }
    }
  }

  set formDefinition(definition) {
    let definitionJSON: any = definition;

    if (typeof definition === 'string') {
      try {
        definitionJSON = JSON.parse(definition);
      } catch (e) {
        console.error('set formDefinition error');
      }
    }
    this.componentsArray = new ArrayList<OComponentData>();
    if (definitionJSON && definitionJSON.hasOwnProperty('components') && definitionJSON.components.length) {
      this.getComponentsFromJSON(definitionJSON.components, this.componentsArray);
    }
    this.innerFormDefinition = definitionJSON;
    this.formDefinition$.next(this.innerFormDefinition);
  }

  get formDefinition(): any {
    return this.innerFormDefinition;
  }

  public definitionToString(): string {
    return JSON.stringify(this.formDefinition);
  }

  private onUpdateComponents(): void {
    const oldValue = this.definitionToString();
    const componentsParsedArray = [];
    this.getComponentsJson(this.componentsArray, componentsParsedArray);
    this.formDefinition = { components: componentsParsedArray };
    this.onFormDefinitionUpdate.emit(this.innerFormDefinition);
    const newValue = this.definitionToString();
    this._fControl.setValue(newValue);
    this.emitOnValueChange(OValueChangeEvent.PROGRAMMATIC_CHANGE, newValue, oldValue);
    this.emitOnChange(newValue);
  }

  public getComponentsJson(components: ArrayList<OComponentData>, parent: any[]): void {
    for (const comp of components) {
      const compInputs = comp.getConfiguredInputs();
      const compObj = Object.assign({}, compInputs);
      compObj['ontimize-directive'] = comp.getDirective();
      if (comp.isContainer()) {
        compObj['children'] = [];
        this.getComponentsJson(comp.getChildren(), compObj['children']);
      }
      parent.push(compObj);
    }
  }

  public openSettingsDialog(component: OComponentData, args?: any): void {
    const dialogRef = this.dialog.open(ComponentSettingsDialogComponent, {
      width: '60%',
      disableClose: true,
      panelClass: ['o-dialog-class', 'o-dynamic-form-builder-dialog']
    });
    dialogRef.componentInstance.setTemplateInputsData(component.getTemplateInputsData());
    dialogRef.componentInstance.setComponent(component);

    dialogRef.afterClosed().subscribe(componentData => {
      if (componentData == null || !(componentData instanceof OComponentData)) {
        return;
      }

      if (args.new && args.parent != null) {
        args.parent.addChild(componentData, args.index);
      } else if (args.new) {
        this.componentsArray.splice(args.index, 0, componentData);
      }

      if (args.new || args.edit) {
        this.onUpdateComponents();
      }
    });
  }

  public getComponentsArray(): OComponentData[] {
    return this.componentsArray.toArray();
  }

  public onAddComponent(args): void {
    const component: OComponentData = args.component;
    const parent: OComponentData = this.getOComponentData(args.parent);
    const dialogArgs = {
      parent: parent,
      index: args.index,
      new: true
    };
    this.openSettingsDialog(component, dialogArgs);
  }

  public onMoveComponent(args): void {
    if (args.type === 'move') {
      this.updateChildrenOrder(args);
    } else if (args.type === 'transfer') {
      this.transferChildren(args);
    }
    this.onUpdateComponents();
  }

  private updateChildrenOrder(args: any) {
    let toSort;
    if (args.parent) {
      const comp: OComponentData = this.getOComponentData(args.parent);
      if (comp) {
        toSort = comp.children;
      }
    } else {
      toSort = this.componentsArray;
    }
    if (toSort && args.attrs) {
      toSort.sort((a, b) => args.attrs.indexOf(a.configuredInputs.attr) - args.attrs.indexOf(b.configuredInputs.attr));
    }
  }

  private transferChildren(args: any) {
    const previousContainer: OComponentData = this.getOComponentData(args.previousContainer);
    const previousChildren = previousContainer ? previousContainer.children : this.componentsArray;
    const transfered = previousChildren[args.previousIndex];
    const container: OComponentData = this.getOComponentData(args.container);
    this._removeElement(transfered.getComponentAttr(), previousChildren);
    if (container) {
      container.addChild(transfered, args.currentIndex);
    } else {
      this.componentsArray.splice(args.currentIndex, 0, transfered);
    }
  }

  public onEditComponentSettings(args): void {
    const component: OComponentData = this.getOComponentData(args.component);
    if (!component) {
      return;
    }
    this.componentProperties.setComponent(component);
  }

  public onDeleteComponent(args): void {
    const component: OComponentData = this.getOComponentData(args.component);
    if (!component) {
      return;
    }
    this._removeElement(component.getComponentAttr(), this.componentsArray);
    this.onUpdateComponents();
  }

  public getOComponentData(fieldComponent: BaseComponent<any> | any) {
    if (!fieldComponent) {
      return undefined;
    }
    const attr = fieldComponent instanceof BaseComponent ? fieldComponent.getComponentAttr() : fieldComponent.attr;
    const component = this._searchElement(attr, this.componentsArray);
    return component;
  }

  public cloneComponent(component): OComponentData {
    return this._cloneComponentData(component.settings);
  }

  get isReadOnly(): boolean {
    return this._isReadOnly;
  }

  set isReadOnly(value: boolean) {
    this._isReadOnly = value;
  }

  public getControl(): FormControl {
    if (!this._fControl) {
      this._fControl = new FormControl();
    }
    return this._fControl;
  }

  public getFormControl(): FormControl {
    return this._fControl;
  }

  public hasError(error: string): boolean {
    return this._fControl && this._fControl.hasError(error);
  }

  private _searchElement(id, array: ArrayList<OComponentData>) {
    let r;
    for (let i = 0; i < array.length; i++) {
      if (id === array[i].getComponentAttr()) {
        return array[i];
      }
      if (array[i].children && array[i].children.length > 0) {
        if ((r = this._searchElement(id, array[i].children)) !== null) {
          return r;
        }
      }
    }
    return null;
  }

  private _removeElement(id, array): void {
    for (let i = 0; i < array.length; i++) {
      if (id === array[i].getComponentAttr()) {
        array.splice(i, 1);
      }
      if (array[i] && array[i].children) {
        this._removeElement(id, array[i].children);
      }
    }
  }

  private _cloneComponentData(settings): OComponentData {
    const newComponent: OComponentData = this.componentsDataService.getOntimizeComponentData(settings['ontimize-directive']);
    delete settings['ontimize-directive'];
    newComponent.setConfiguredInputs(settings);
    if (settings.children) {
      settings.children.forEach(child => {
        newComponent.addChild(this._cloneComponentData(child));
      });
    }
    return newComponent;
  }

  onDrop() {
    this.appMenu.entered();
  }

  public save() {
    if (this.parentForm) {
      this.parentForm.update();
    }
  }

  protected emitOnValueChange(type, newValue, oldValue): void {
    const event = new OValueChangeEvent(type, newValue, oldValue, this);
    this.onValueChange.emit(event);
  }

  protected emitOnChange(value): void {
    this.onChange.emit(value);
  }

  get isEditionActive(): boolean {
    return this.editMode || !this.isReadOnly;
  }

}
