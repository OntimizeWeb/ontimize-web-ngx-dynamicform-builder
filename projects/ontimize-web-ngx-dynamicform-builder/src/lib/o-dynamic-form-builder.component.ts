import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  OnInit,
  Optional,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ResizeEvent } from 'angular-resizable-element';
import {
  IComponent,
  IFormDataComponent,
  IFormDataTypeComponent,
  InputConverter,
  OFormComponent,
  OFormControl,
  OFormValue,
  OValueChangeEvent,
  SQLTypes,
} from 'ontimize-web-ngx';
import { BaseComponent, ODynamicFormComponent } from 'ontimize-web-ngx-dynamicform';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ComponentPropertiesComponent } from './component-properties/component-properties.component';
import { ComponentsMenuComponent } from './components-menu/components-menu.component';
import { ComponentsTreeComponent } from './components-tree/components-tree.component';
import {
  ChooseSelectorDialogComponent,
} from './ontimize-components-data/choose-selector-dialog/choose-selector-dialog.component';
import { OComponentData } from './ontimize-components-data/o-component-data.class';
import { ComponentsAttrsService } from './services/components-attrs.service';
import { ComponentsDataService } from './services/components-data.service';
import { ODynamicFormBuidlerUtils } from './utils/o-dynamic-form-builder-utils';


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
  public componentsArray: OComponentData[] = [];

  public render: EventEmitter<any> = new EventEmitter();
  public onFormDefinitionUpdate: EventEmitter<Object> = new EventEmitter<Object>();

  public onChange: EventEmitter<object> = new EventEmitter<object>();
  public onValueChange: EventEmitter<OValueChangeEvent> = new EventEmitter<OValueChangeEvent>();

  protected oattr: string;
  protected innerFormDefinition: any = null;

  protected _isReadOnly: boolean;
  protected _fControl: OFormControl;

  forcedEditionMode: boolean = true;

  @ViewChild('innerForm', { static: false })
  protected innerForm: OFormComponent;

  @ViewChild('dynamicForm', { static: false })
  protected dynamicForm: ODynamicFormComponent;

  @ViewChild('appMenu', { static: false })
  protected appMenu: ComponentsMenuComponent;

  @ViewChild('componentProperties', { static: false })
  protected componentProperties: ComponentPropertiesComponent;

  @ViewChild('componentsTree', { static: false })
  protected componentsTree: ComponentsTreeComponent;

  // @ViewChild('leftSidenav', { read: ViewContainerRef, static: false })
  // leftSidenavRef: ViewContainerRef;

  // @ViewChild('rightSidenav', { read: ViewContainerRef, static: false })
  // rightSidenavRef: ViewContainerRef;

  protected subscriptions: Subscription = new Subscription();

  constructor(
    protected componentsDataService: ComponentsDataService,
    protected componentsAttrsService: ComponentsAttrsService,
    @Optional() @Inject(forwardRef(() => OFormComponent)) public parentForm: OFormComponent,
    protected dialog: MatDialog,
    public renderer: Renderer2
  ) {
    this.componentsAttrsService.setFormDefinitionListener(this.formDefinition$);
  }

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

      this.subscriptions.add(this.parentForm.onFormInitStream.subscribe(() => {
        const selectedIndex = this.parentForm.isInInsertMode() ? 1 : 0;
        this.appMenu.setActiveComponentsSelectors(selectedIndex);
      }));
    }
  }

  public ngOnDestroy(): void {
    this.unregisterFormListeners();
    this.componentsAttrsService.destroy();
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  public unregisterFormListeners(): void {
    if (this.parentForm) {
      this.parentForm.unregisterFormComponent(this);
      this.parentForm.unregisterFormControlComponent(this);
      this.parentForm.unregisterSQLTypeFormComponent(this);
    }
  }

  public getValue(): string {
    return this._fControl.value;
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
    this.componentsArray = [];
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
    this.refreshComponentProperties();
  }

  private refreshComponentProperties() {
    this.setComponentPropertiesByAttr(this.componentProperties.attr);
  }

  public getComponentsJson(components: OComponentData[], parent: any[]): void {
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

  public getComponentsArray(): OComponentData[] {
    return this.componentsArray;
  }

  public onAddComponent(args): void {
    const component: OComponentData = args.component;
    const parentComp: OComponentData = this.getOComponentData(args.parent);
    this.addComponentDataToParent(component, parentComp, args.index);
    this.componentProperties.attr = null;
    this.onUpdateComponents();
    this.setComponentPropertiesByAttr(component.getComponentAttr());
  }

  private addComponentDataToParent(component: OComponentData, parent: OComponentData, index: number) {
    if (parent != null) {
      parent.addChild(component, index);
    } else {
      this.componentsArray.splice(index, 0, component);
    }
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

  public onEditComponentSettings(attr: string): void {
    this.setComponentTreeSelectedNodeByAttr(attr);
    this.setComponentPropertiesByAttr(attr);
  }

  public onDeleteComponent(attr: string): void {
    this.dynamicForm.setActiveComponent(null);
    this.componentProperties.attr = null;
    this._removeElement(attr, this.componentsArray);
    this.onUpdateComponents();
  }

  public onChangeComponentSelector(attr: string): void {
    const componentRef = this._searchElement(attr, this.componentsArray);
    if (!componentRef) {
      return;
    }
    if (componentRef.isContainer()) {
      componentRef.changeSelector();
      this.onUpdateComponents();
    } else {
      let selectors = componentRef.getAvailableSelectorsToChange();
      if (selectors.length > 0) {
        selectors.splice(selectors.indexOf(componentRef.getDirective()), 1);
        this.dialog.open(ChooseSelectorDialogComponent, {
          width: '200px',
          height: '500px',
          disableClose: false,
          data: {
            availableSelectors: selectors
          }
        }).afterClosed().subscribe((res) => {
          if (res != null) {
            componentRef.changeSelector(res);
            this.onUpdateComponents();
          }
        });
      }
    }
  }

  public onAddPredefinedLayout(args: any): void {
    let parentComponent: OComponentData;
    if (args.mode === 'existingContainer') {
      parentComponent = this._searchElement(args.attr, this.componentsArray);
    } else if (args.mode === 'new' && args.parent != null) {
      parentComponent = this.getOComponentData(args.parent);
    }

    this.appMenu.openLayoutsDialog((result) => {
      if (result == null) {
        return;
      }
      if (result.type === 'predefined-layout') {
        const randomId = Math.random().toString(36).substring(9);
        const components = JSON.parse(result.data.components);
        const componentsData = this.createComponentsData(components, randomId);
        componentsData.forEach((comp, index) => {
          this.addComponentDataToParent(comp, parentComponent, args.index + index);
        });
        this.onUpdateComponents();
      } else if (result.type === 'component') {
        const compData = this.componentsDataService.getOntimizeComponentData(result.data['ontimize-component']);
        if (compData != null) {
          this.onAddComponent({
            component: compData,
            parent: parentComponent,
            index: args.index || parentComponent.children.length || 0
          });
        }
      }
    });
  }

  private createComponentsData(components: any[], randomAttr: string, parent?: OComponentData): OComponentData[] {
    const result: OComponentData[] = [];
    components.forEach((comp, index) => {
      const compData = this.componentsDataService.getOntimizeComponentData(comp['ontimize-directive']);
      compData.configuredInputs.attr = `${randomAttr}-${index}`;
      if (comp.children) {
        this.createComponentsData(comp.children, compData.configuredInputs.attr, compData);
      }
      if (parent) {
        parent.addChild(compData);
      } else {
        result.push(compData);
      }
    });
    return result;
  }

  public getOComponentData(fieldComponent: BaseComponent<any> | OComponentData | any) {
    if (fieldComponent == null || fieldComponent instanceof OComponentData) {
      return fieldComponent;
    }
    const attr = fieldComponent instanceof BaseComponent ? fieldComponent.getComponentAttr() : fieldComponent.attr;
    const component = this._searchElement(attr, this.componentsArray);
    return component;
  }

  get isReadOnly(): boolean {
    return this._isReadOnly;
  }

  set isReadOnly(value: boolean) {
    this._isReadOnly = value;
  }

  public getControl(): OFormControl {
    if (!this._fControl) {
      this._fControl = new OFormControl();
    }
    return this._fControl;
  }

  public getFormControl(): OFormControl {
    return this._fControl;
  }

  public hasError(error: string): boolean {
    return this._fControl && this._fControl.hasError(error);
  }

  private _searchElement(id: string, array: OComponentData[]): OComponentData {
    return ODynamicFormBuidlerUtils.searchElement(id, array, (comp: OComponentData) => comp.getComponentAttr());
  }

  private _removeElement(id: string, array: OComponentData[]): void {
    ODynamicFormBuidlerUtils.removeElement(id, array, (comp: OComponentData) => comp.getComponentAttr());
  }

  onDrop() {
    this.appMenu.entered();
  }

  public save() {
    if (!this.parentForm) {
      return;
    }
    if (this.parentForm.isInInsertMode()) {
      this.parentForm.insert();
    } else {
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
    return this.forcedEditionMode && (this.editMode || !this.isReadOnly);
  }

  componentUpdated() {
    this.onUpdateComponents();
  }

  componentsMenuEditionChange(editableComponentsSelector: string[]) {
    this.dynamicForm.editableComponents = editableComponentsSelector;
  }

  get componentsMenuConnectedDropListIds(): string[] {
    const result = [];
    if (this.componentsTree) {
      result.push(this.componentsTree.uId);
    }
    if (this.dynamicForm) {
      result.push(...this.dynamicForm.connectedDropListIds);
    }
    return result;
  }

  protected setComponentPropertiesByAttr(attr: string) {
    if (this.componentProperties) {
      const componentRef = this._searchElement(attr, this.componentsArray);
      this.componentProperties.component = componentRef;
    }
  }

  protected setComponentTreeSelectedNodeByAttr(attr: string) {
    if (this.componentsTree) {
      this.componentsTree.setSelectedNodeByAttr(attr);
    }
  }

  setSelectedComponent(attr: string) {
    this.dynamicForm.setActiveComponent(attr);
    this.setComponentPropertiesByAttr(attr);
  }

  setHoverComponent(attr: string) {
    this.dynamicForm.setHoverComponent(attr);
  }

  changeEditionMode(val: MatSlideToggleChange) {
    this.forcedEditionMode = !val.checked;
  }

  onResizeEnd(property: string, event: ResizeEvent, el: any): void {
    this.renderer.addClass(el, 'resized');
    this.renderer.setStyle(el, property, `${event.rectangle[property]}px`);
  }

  onHoverComponent(attr: string) {
    if (this.componentsTree) {
      this.componentsTree.setHoverNodeByAttr(attr);
    }
  }
}
