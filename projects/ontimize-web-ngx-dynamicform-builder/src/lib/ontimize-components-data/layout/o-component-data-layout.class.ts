import { InputMetadata } from '../../types/inputs-metadata.type';
import { OComponentData } from '../o-component-data.class';

export class OComponentDataLayout extends OComponentData {

  public isContainer(): boolean {
    return true;
  }

  public getBasicInputs(): string[] {
    const result = super.getBasicInputs();
    result.push(...['title', 'layout-align']);
    return result;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'title',
      type: 'string',
      label: 'title',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'layout-align',
      type: 'combo',
      label: 'layout-align',
      tooltip: '',
      default: 'start start',
      required: false,
      values: [
        'start start',
        'start center',
        'start end',
        'start stretch',
        'center start',
        'center center',
        'center end',
        'center stretch',
        'end start',
        'end center',
        'end end',
        'end stretch',
        'space-around start',
        'space-around center',
        'space-around end',
        'space-around stretch',
        'space-between start',
        'space-between center',
        'space-between end',
        'space-between stretch'
      ]
    }, {
      input: 'elevation',
      type: 'number',
      label: 'elevation',
      tooltip: '',
      default: 0,
      required: false
    }, {
      input: 'icon',
      type: 'string',
      label: 'icon',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'layout-gap',
      type: 'string',
      label: 'layout-gap',
      tooltip: '',
      default: '8px',
      required: false
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

  public changeSelector(selector?: string) {
    this.overridedDirective = (this.getDirective() === 'o-row') ? 'o-column' : 'o-row';
  }
}
