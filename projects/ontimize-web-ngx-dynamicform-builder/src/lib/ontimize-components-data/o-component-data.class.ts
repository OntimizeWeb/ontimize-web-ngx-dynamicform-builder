import { ArrayList } from '../utils/collections/ArrayList';

export class OComponentData {

  public configuredInputs: any = {};
  public children: ArrayList<OComponentData>;

  constructor() {
    if (this.isContainer()) {
      this.children = new ArrayList<OComponentData>();
    }
  }

  public getDirective(): string {
    return '';
  }

  public getInputsProperties(): string[] {
    return [];
  }

  public getInputs(): string[] {
    const rawProperties = this.getInputsProperties();
    const parsedProperties = [];
    rawProperties.forEach(properties => {
      const splitted = properties.split(':');
      parsedProperties.push(splitted[splitted.length - 1].trim());
    });
    return parsedProperties;
  }

  public getTemplateInputsData(): any {
    return {
      attr: {
        type: 'string',
        label: 'attr',
        tooltip: '',
        default: null,
        required: true
      }
    };
  }

  public isContainer(): boolean {
    return false;
  }

  public setConfiguredInputs(data: any): void {
    this.configuredInputs = Object.assign(this.configuredInputs, data);
  }

  public getComponentAttr(): string {
    return this.configuredInputs ? this.configuredInputs.attr : undefined;
  }

  public getConfiguredInputs(): any {
    return this.configuredInputs;
  }

  public getConfiguredInputValue(inputName: string): any {
    return this.configuredInputs ? this.configuredInputs[inputName] : undefined;
  }

  public addChild(child: OComponentData): void {
    this.children.push(child);
  }

  public getChildren(): ArrayList<OComponentData> {
    return this.children;
  }

}
