import {
  Component,
  ViewChild,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Optional,
  Inject,
  forwardRef
} from '@angular/core';
import { MdDialog } from '@angular/material';
import {
  InputConverter,
  OFormComponent,
  IComponent,
  SQLTypes,
  IFormDataTypeComponent,
  IFormDataComponent,
  OFormValue
} from 'ontimize-web-ng2';
import { /*BaseComponent,*/ ODynamicFormComponent } from 'ontimize-web-ng2-dynamicform';

import { ArrayList } from './utils/index';
import { ComponentsDataService } from './services/index';
import { OComponentData } from './ontimize-components-data/index';
import { ComponentSettingsDialogComponent } from './component-settings-dialog.component';

@Component({
  selector: 'o-dynamic-form-builder',
  template: require('./o-dynamic-form-builder.component.html'),
  styles: [require('./o-dynamic-form-builder.component.scss')],
  inputs: [
    'oattr :attr',
    'autoBinding: automatic-binding',
    'formDefinition: form-definition'
  ],
  outputs: [
    'render',
    'onFormDefinitionUpdate'
  ],
  encapsulation: ViewEncapsulation.None
})

export class ODynamicFormBuilderComponent implements OnInit, IComponent, IFormDataTypeComponent, IFormDataComponent {

  /* Inputs */
  protected oattr: string;
  @InputConverter()
  autoBinding: boolean = true;
  /* End of inputs */

  protected _isReadOnly: boolean;

  @ViewChild('wrapperForm')
  wrapperForm: OFormComponent;

  @ViewChild('dynamicForm')
  dynamicForm: ODynamicFormComponent;

  innerFormDefinition: Object = null;

  componentsArray: ArrayList<OComponentData> = new ArrayList<OComponentData>();

  render: EventEmitter<any> = new EventEmitter();
  onFormDefinitionUpdate: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(
    protected dialog: MdDialog,
    protected componentsDataService: ComponentsDataService,
    @Optional() @Inject(forwardRef(() => OFormComponent)) protected parentForm: OFormComponent
  ) { }

  ngOnInit() {
    let setDefaultDef = !this.formDefinition;
    if (setDefaultDef) {
      this.innerFormDefinition = {
        'components': []
      };
    }
    if (this.parentForm) {
      this.registerFormListeners();
      this._isReadOnly = this.parentForm.isInInitialMode();
    } else {
      this._isReadOnly = false;
    }
  }

  registerFormListeners() {
    if (this.parentForm) {
      this.parentForm.registerFormComponent(this);
      // this.parentForm.registerDynamicFormComponent(this);
      this.parentForm.registerSQLTypeFormComponent(this);
    }
  }

  ngOnDestroy() {
    this.unregisterFormListeners();
  }

  unregisterFormListeners() {
    if (this.parentForm) {
      this.parentForm.unregisterFormComponent(this);
      // this.parentForm.unregisterDynamicFormComponent(this);
      this.parentForm.unregisterSQLTypeFormComponent(this);
    }
  }

  setValue(val) {
    this.formDefinition = val;
  }

  getAttribute(): string {
    if (this.oattr) {
      return this.oattr;
    }
    return undefined;
  }

  getSQLType(): number {
    return SQLTypes.OTHER;
  }

  reloadWrapperFormMode() {
    // re-setting wrapper form mode for setting mode to new components
    this.wrapperForm.setFormMode(this.wrapperForm.mode);
  }

  onDynamicFormRendered() {
    this.reloadWrapperFormMode();
    if (this.render) {
      this.render.emit(true);
    }
  }

  set data(value: any) {
    let formDef = undefined;
    if (value instanceof OFormValue) {
      formDef = value.value;
    }
    if (!formDef) {
      formDef = {
        'components': []
      };
    }
    this.formDefinition = formDef;
  }

  isAutomaticBinding(): Boolean {
    return this.autoBinding;
  }

  getComponentsFromJSON(componentsJSON, parent) {
    for (var i = 0; i < componentsJSON.length; i++) {
      let comp = Object.assign({}, componentsJSON[i]);
      if (comp.hasOwnProperty('ontimize-directive')) {
        let compData = this.componentsDataService.getOntimizeComponentData(comp['ontimize-directive']);

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
  }

  get formDefinition() {
    return this.innerFormDefinition;
  }

  definitionToString() {
    return JSON.stringify(this.formDefinition);
  }

  onUpdateComponents() {
    var componentsParsedArray = [];
    this.getComponentsJson(this.componentsArray, componentsParsedArray);
    this.formDefinition = { components: componentsParsedArray };
    this.onFormDefinitionUpdate.emit(this.innerFormDefinition);
  }

  getComponentsJson(components: ArrayList<OComponentData>, parent: Array<any>) {
    for (var i = 0; i < components.length; i++) {
      let comp = components[i];
      let compInputs = comp.getConfiguredInputs();
      let compObj = Object.assign({}, compInputs);
      compObj['ontimize-directive'] = comp.getDirective();
      if (comp.isContainer()) {
        compObj['children'] = [];
        this.getComponentsJson(comp.getChildren(), compObj['children']);
      }
      parent.push(compObj);
    }
  }

  openSettingsDialog(component: OComponentData, args?: any) {
    var self = this;
    let dialogRef = this.dialog.open(ComponentSettingsDialogComponent, {
      width: '60%',
      disableClose: true
    });
    dialogRef.componentInstance.setTemplateInputsData(component.getTemplateInputsData());
    dialogRef.componentInstance.setComponent(component);

    dialogRef.afterClosed().subscribe(newComponent => {
      if (newComponent !== false && newComponent instanceof OComponentData) {
        let emptyArgs = !Object.keys(args || {}).length;
        if (emptyArgs) {
          self.componentsArray.unshift(newComponent);
        } else if (args.hasOwnProperty('previousSibling')) {
          self._insertElement(args.previousSibling.getComponentAttr(), self.componentsArray, newComponent);
        } else if (args.hasOwnProperty('parent')) {
          args.parent.addChild(newComponent);
        }

        // else if (args.hasOwnProperty('edit'))

        self.onUpdateComponents();
      }
    });
  }

  getComponentsArray() {
    return this.componentsArray.toArray();
  }

  onAddComponent(args) {
    let component: OComponentData = args.component;
    let previousSibling: OComponentData = this.getOComponentData(args.previousSibling);
    let parent: OComponentData = this.getOComponentData(args.parent);

    let dialogArgs = {};
    if (previousSibling) {
      dialogArgs['previousSibling'] = previousSibling;
    }
    if (parent) {
      dialogArgs['parent'] = parent;
    }

    this.openSettingsDialog(component, dialogArgs);
  }

  onMoveComponent(args) {
    let component/*: BaseComponent*/ = args.component;
    // Delete old component
    this.onDeleteComponent(args);
    // Create a copy of the deleted component
    let newComponent: OComponentData = this.cloneComponent(component);
    // Add the new copy of the component to dynamic form
    if (args.hasOwnProperty('previousSibling')) {
      this._insertElement(args.previousSibling.getComponentAttr(), this.componentsArray, newComponent);
    } else if (args.hasOwnProperty('parent')) {
      let parent: OComponentData = this._searchElement(args.parent.getComponentAttr(), this.componentsArray);
      if (parent) {
        parent.addChild(newComponent);
      }
    } else {
      this.componentsArray.unshift(newComponent);
    }

    this.onUpdateComponents();
  }

  onEditComponentSettings(args) {
    var component: OComponentData = this.getOComponentData(args.component);
    if (!component) {
      return;
    }
    this.openSettingsDialog(component, { edit: true });
  }

  onDeleteComponent(args) {
    var component: OComponentData = this.getOComponentData(args.component);
    if (!component) {
      return;
    }
    this._removeElement(component.getComponentAttr(), this.componentsArray);
    this.onUpdateComponents();
  }

  getOComponentData(fieldComponent) {
    if (!fieldComponent) {
      return undefined;
    }
    var component = this._searchElement(fieldComponent.getComponentAttr(), this.componentsArray);
    return component;
  }

  cloneComponent(component): OComponentData {
    return this._cloneComponentData(component.settings);
  }

  get isReadOnly(): boolean {
    return this._isReadOnly;
  }

  set isReadOnly(value: boolean) {
    this._isReadOnly = value;
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

  private _insertElement(id, array, newComponent) {
    for (let i = 0; i < array.length; i++) {
      if (id === array[i].getComponentAttr()) {
        array.splice(i + 1, 0, newComponent);
      }
      if (array[i].children) {
        this._insertElement(id, array[i].children, newComponent);
      }
    }
  }

  private _removeElement(id, array) {
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
    let newComponent: OComponentData = this.componentsDataService.getOntimizeComponentData(settings['ontimize-directive']);
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
