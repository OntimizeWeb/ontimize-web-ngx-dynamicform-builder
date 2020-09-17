import { Component, EventEmitter, forwardRef, Inject, OnInit, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { ODynamicFormComponent } from 'ontimize-web-ngx-dynamicform';
import { BehaviorSubject } from 'rxjs';

import { ComponentSettingsDialogComponent } from './component-settings-dialog.component';
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
    'formDefinition: form-definition'
  ],
  outputs: [
    'render',
    'onFormDefinitionUpdate'
  ],
  encapsulation: ViewEncapsulation.None
})

export class ODynamicFormBuilderComponent implements OnInit, IComponent, IFormDataTypeComponent, IFormDataComponent {

  @InputConverter()
  public autoBinding: boolean = true;
  @InputConverter()
  public autoRegistering: boolean = true;

  public formDefinition$: BehaviorSubject<any> = new BehaviorSubject(null);
  public componentsArray: ArrayList<OComponentData> = new ArrayList<OComponentData>();

  public render: EventEmitter<any> = new EventEmitter();
  public onFormDefinitionUpdate: EventEmitter<Object> = new EventEmitter<Object>();

  public onChange: EventEmitter<Object>;
  public onValueChange: EventEmitter<OValueChangeEvent>;

  protected oattr: string;
  protected innerFormDefinition: any = null;

  protected _isReadOnly: boolean;
  protected _fControl: FormControl;

  @ViewChild('innerForm', { static: false })
  protected innerForm: OFormComponent;
  @ViewChild('dynamicForm', { static: false })
  protected dynamicForm: ODynamicFormComponent;

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
      // this.parentForm.registerDynamicFormComponent(this);
      this.parentForm.registerSQLTypeFormComponent(this);
    }
  }

  public ngOnDestroy(): void {
    this.unregisterFormListeners();
  }

  public unregisterFormListeners(): void {
    if (this.parentForm) {
      this.parentForm.unregisterFormComponent(this);
      // this.parentForm.unregisterDynamicFormComponent(this);
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

  public onUpdateComponents(): void {
    const componentsParsedArray = [];
    this.getComponentsJson(this.componentsArray, componentsParsedArray);
    this.formDefinition = { components: componentsParsedArray };
    this.onFormDefinitionUpdate.emit(this.innerFormDefinition);
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
    const self = this;
    const dialogRef = this.dialog.open(ComponentSettingsDialogComponent, {
      width: '60%',
      disableClose: true,
      panelClass: ['o-dialog-class', 'o-dynamic-form-builder-dialog']
    });
    dialogRef.componentInstance.setTemplateInputsData(component.getTemplateInputsData());
    dialogRef.componentInstance.setComponent(component);

    dialogRef.afterClosed().subscribe(newComponent => {
      if (newComponent !== false && newComponent instanceof OComponentData) {
        const emptyArgs = !Object.keys(args || {}).length;
        if (emptyArgs) {
          self.componentsArray.unshift(newComponent);
        } else if (args.hasOwnProperty('previousSibling')) {
          self._insertElement(args.previousSibling.getComponentAttr(), self.componentsArray, newComponent);
        } else if (args.hasOwnProperty('parent')) {
          args.parent.addChild(newComponent);
        }

        self.onUpdateComponents();
      }
    });
  }

  public getComponentsArray(): OComponentData[] {
    return this.componentsArray.toArray();
  }

  public onAddComponent(args): void {
    const component: OComponentData = args.component;
    const previousSibling: OComponentData = this.getOComponentData(args.previousSibling);
    const parent: OComponentData = this.getOComponentData(args.parent);

    const dialogArgs = {};
    if (previousSibling) {
      dialogArgs['previousSibling'] = previousSibling;
    }
    if (parent) {
      dialogArgs['parent'] = parent;
    }

    this.openSettingsDialog(component, dialogArgs);
  }

  public onMoveComponent(args): void {
    const component /*: BaseComponent*/ = args.component;
    // Delete old component
    this.onDeleteComponent(args);
    // Create a copy of the deleted component
    const newComponent: OComponentData = this.cloneComponent(component);
    // Add the new copy of the component to dynamic form
    if (args.hasOwnProperty('previousSibling')) {
      this._insertElement(args.previousSibling.getComponentAttr(), this.componentsArray, newComponent);
    } else if (args.hasOwnProperty('parent')) {
      const parent: OComponentData = this._searchElement(args.parent.getComponentAttr(), this.componentsArray);
      if (parent) {
        parent.addChild(newComponent);
      }
    } else {
      this.componentsArray.unshift(newComponent);
    }

    this.onUpdateComponents();
  }

  public onEditComponentSettings(args): void {
    const component: OComponentData = this.getOComponentData(args.component);
    if (!component) {
      return;
    }
    this.openSettingsDialog(component, { edit: true });
  }

  public onDeleteComponent(args): void {
    const component: OComponentData = this.getOComponentData(args.component);
    if (!component) {
      return;
    }
    this._removeElement(component.getComponentAttr(), this.componentsArray);
    this.onUpdateComponents();
  }

  public getOComponentData(fieldComponent) {
    if (!fieldComponent) {
      return undefined;
    }
    const component = this._searchElement(fieldComponent.getComponentAttr(), this.componentsArray);
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

  private _searchElement(id, array) {
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

  private _insertElement(id, array, newComponent): void {
    for (let i = 0; i < array.length; i++) {
      if (id === array[i].getComponentAttr()) {
        array.splice(i + 1, 0, newComponent);
      }
      if (array[i].children) {
        this._insertElement(id, array[i].children, newComponent);
      }
    }
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

}
