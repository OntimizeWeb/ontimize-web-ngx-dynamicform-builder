import { OComponentData } from '../o-component-data.class';

export class OComponentDataLayout extends OComponentData {

  public isContainer(): boolean {
    return true;
  }

  public getTemplateInputsData(): any {
    const templateInputsData = super.getTemplateInputsData();
    templateInputsData['title'] = {
      type: 'string',
      label: 'title',
      tooltip: '',
      default: null,
      required: false
    };
    templateInputsData['layout-align'] = {
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
    };
    templateInputsData['elevation'] = {
      type: 'number',
      label: 'elevation',
      tooltip: '',
      default: 0,
      required: false
    };
    templateInputsData['icon'] = {
      type: 'string',
      label: 'icon',
      tooltip: '',
      default: null,
      required: false
    };
    templateInputsData['layout-gap'] = {
      type: 'string',
      label: 'layout-gap',
      tooltip: '',
      default: '8px',
      required: false
    };
    return templateInputsData;
  }

}
