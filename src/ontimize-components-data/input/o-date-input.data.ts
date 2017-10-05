import { DEFAULT_INPUTS_O_DATE_INPUT } from 'ontimize-web-ngx';
import { OTextInputData } from './o-text-input.data';

export class ODateInputData extends OTextInputData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-date-input';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_DATE_INPUT;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['format'] = {
      'type': 'string',
      'label': 'format',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['locale'] = {
      'type': 'string',
      'label': 'locale',
      'tooltip': '',
      'default': null,
      'required': false
    };

    templateInputsData['touch-ui'] = {
      'type': 'boolean',
      'label': 'touch-ui',
      'tooltip': '',
      'default': false,
      'required': false
    };

    // // possible values 'month' | 'year' //TODO ENUM
    // templateInputsData['start-view'] = {
    //   'type': 'string',
    //   'label': 'start-view',
    //   'tooltip': '',
    //   'default': 'month',
    //   'required': false
    // };

    //  //TODO type date
    // templateInputsData['min'] = {
    //   'type': 'string',
    //   'label': 'min',
    //   'tooltip': '',
    //   'default': null,
    //   'required': false
    // };

    // templateInputsData['max'] = {
    //   'type': 'string',
    //   'label': 'max',
    //   'tooltip': '',
    //   'default': null,
    //   'required': false
    // };

    // templateInputsData['start-at'] = {
    //   'type': 'string',
    //   'label': 'start-at',
    //   'tooltip': '',
    //   'default': null,
    //   'required': false
    // };

    // // type DateFilterFunction = (date: Date) => boolean; // todo type function
    // templateInputsData['filter-date'] = {
    //   'type': 'string',
    //   'label': 'filter-date',
    //   'tooltip': '',
    //   'default': null,
    //   'required': false
    // };
    return templateInputsData;
  }

}
