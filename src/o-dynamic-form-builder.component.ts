import {
  Component,
  ViewChild,
  OnInit,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';
import { MdDialog } from '@angular/material';

import { OFormComponent, Mode } from 'ontimize-web-ng2';

import { ArrayList } from './utils/index';
import { ComponentsDataService } from './services/index';
import { OComponentData } from './ontimize-components-data/index';
import { ComponentSettingsDialogComponent } from './component-settings-dialog.component';

@Component({
  moduleId: module.id,
  selector: 'o-dynamic-form-builder',
  templateUrl: 'o-dynamic-form-builder.component.html',
  styleUrls: ['o-dynamic-form-builder.component.css'],
  inputs: [
    'formDefinition: form-definition'
  ],
  outputs: [
    'onFormDefinitionUpdate'
  ],
  encapsulation: ViewEncapsulation.None
})

export class ODynamicFormBuilderComponent implements OnInit {
  @ViewChild('oForm')
  wrapperForm: OFormComponent;
  // wrapperForm: DynamicFormBuilderFormComponent;

  innerFormDefinition: Object = null;
  parsedDynamicFormJsonData: string;

  componentsArray: ArrayList<OComponentData> = new ArrayList<OComponentData>();

  onFormDefinitionUpdate: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(
    private dialog: MdDialog,
    private componentsDataService: ComponentsDataService
  ) {
  }

  ngOnInit() {
    let setDefaultDef = !this.formDefinition;
    if (setDefaultDef) {
      this.innerFormDefinition = {
        'title': '',
        'components': []
      };
    }
  }

  onDynamicFormRendered() {
    this.wrapperForm.setFormMode(Mode.INITIAL);
  }

  getComponentsFromJSON(componentsJSON, parent) {
    for (var i = 0; i < componentsJSON.length; i++) {
      let comp = Object.assign({}, componentsJSON[i]);
      if (comp.hasOwnProperty('ontimize-directive')) {
        let compData = this.componentsDataService.getOntimizeComponentData(comp['ontimize-directive']);

        delete comp['ontimize-directive'];
        compData.setConfiguredInputs(comp);

        if (compData.isContainer() && comp.hasOwnProperty('children') && comp.children.lenght) {
          this.getComponentsFromJSON(comp.children, compData.children);
        }
        parent.push(compData);
      }
    }
  }

  set formDefinition(val) {
    if (typeof val === 'string') {
      try {
        let parsedJSON = JSON.parse(val);
        if (parsedJSON.hasOwnProperty('components') && parsedJSON.components.length) {
          this.getComponentsFromJSON(parsedJSON.components, this.componentsArray);
        }
        this.innerFormDefinition = parsedJSON;
      } catch (e) {
        console.error('set formDefinition error');
      }
    }
  }

  get formDefinition() {
    return this.innerFormDefinition;
  }

  onUpdateComponents() {
    var componentsParsedArray = [];
    this.getComponentsJson(this.componentsArray, componentsParsedArray);
    this.innerFormDefinition['components'] = componentsParsedArray;
    this.parsedDynamicFormJsonData = JSON.stringify(componentsParsedArray, null, 4);

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

  openSettingsDialog(component: OComponentData, templateInputsData, args?: any) {
    var self = this;
    let dialogRef = this.dialog.open(ComponentSettingsDialogComponent, {
      width: '60%',
      disableClose: true
    });
    dialogRef.componentInstance.setTemplateInputsData(templateInputsData);
    dialogRef.componentInstance.setComponent(component);

    dialogRef.afterClosed().subscribe(newComponent => {
      if (newComponent !== false && newComponent instanceof OComponentData) {
        let emptyArgs = !Object.keys(args || {}).length;

        if (emptyArgs) {

          self.componentsArray.unshift(newComponent);

        } else if (args.hasOwnProperty('previousSibling')) {

          let siblingIdx = self.componentsArray.indexOf(args.previousSibling);
          self.componentsArray.splice(siblingIdx + 1, 0, newComponent);

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

    var self = this;
    this.componentsDataService.getComponentsInputsData().then(
      function (templateInputsData) {
        self.openSettingsDialog(component, templateInputsData, dialogArgs);
      },
      function (reason) {
        console.error('Something went wrong', reason);
      });
  }
  // : BaseComponent
  onEditComponentSettings(args) {
    var component: OComponentData = this.getOComponentData(args.component);
    if (!component) {
      return;
    }
    var self = this;
    this.componentsDataService.getComponentsInputsData().then(
      function (templateInputsData) {
        self.openSettingsDialog(component, templateInputsData, {
          edit: true
        });
      },
      function (reason) {
        console.error('Something went wrong', reason);
      });
  }

  onDeleteComponent(args) {
    var component: OComponentData = this.getOComponentData(args.component);
    if (!component) {
      return;
    }
    let arrayArg: Array<OComponentData> = new Array<OComponentData>();
    arrayArg.push(component);
    this.componentsArray.removeAll(arrayArg);
    this.onUpdateComponents();
  }

  getOComponentData(fieldComponent): OComponentData {
    if (!fieldComponent) {
      return undefined;
    }
    var component: OComponentData = this.componentsArray.find((element: OComponentData, index, arr): boolean => {
      return (element.getComponentAttr() === fieldComponent.getComponentAttr());
    });
    return component;
  }



}
