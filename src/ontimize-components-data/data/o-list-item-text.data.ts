import { DEFAULT_INPUTS_O_LIST_ITEM_TEXT } from 'ontimize-web-ngx';
import { OListItemData } from './o-list-item.class';

export class OListItemTextData extends OListItemData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-list-item-text';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_LIST_ITEM_TEXT;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['icon-position'] = {
      'type': 'combo',
      'label': 'icon-position',
      'tooltip': '',
      'default': 'right',
      'required': true,
      'values': [
        'left',
        'right'
      ]
    };
    return templateInputsData;
  }

}
