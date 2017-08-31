import { ArrayList } from '../utils/index';

export class OComponentData {

  configuredInputs: any = {};
  children: ArrayList<OComponentData>;

  constructor() {
    if (this.isContainer()) {
      this.children = new ArrayList<OComponentData>();
    }
  }

  getDirective() {
    return '';
  }

  getInputsProperties() {
    return [];
  }

  getInputs() {
    let rawProperties = this.getInputsProperties();
    let parsedProperties = [];
    for (var i = 0; i < rawProperties.length; i++) {
      let splitted = rawProperties[i].split(':');
      parsedProperties.push(splitted[splitted.length - 1].trim());
    }
    return parsedProperties;
  }

  isContainer(): Boolean {
    return false;
  }

  setConfiguredInputs(data) {
    this.configuredInputs = Object.assign(this.configuredInputs, data);
  }

  getComponentAttr() {
    return this.configuredInputs ? this.configuredInputs.attr : undefined;
  }

  getConfiguredInputs() {
    return this.configuredInputs;
  }

  getConfiguredInputValue(inputName) {
    return this.configuredInputs ? this.configuredInputs[inputName] : undefined;
  }

  addChild(child: OComponentData) {
    this.children.push(child);
  }

  getChildren(): ArrayList<OComponentData> {
    return this.children;
  }

}
