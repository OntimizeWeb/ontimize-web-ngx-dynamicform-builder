import { DEFAULT_INPUTS_O_LIST_ITEM_AVATAR } from 'ontimize-web-ngx';
import { OListItemData } from './o-list-item.class';

export class OListItemAvatarData extends OListItemData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-list-item-avatar';
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_LIST_ITEM_AVATAR;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['avatar'] = {
      'type': 'string',
      'label': 'avatar',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['empty-avatar'] = {
      'type': 'string',
      'label': 'empty-avatar',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['avatar-type'] = {
      'type': 'combo',
      'label': 'avatar-type',
      'tooltip': '',
      'default': 'url',
      'required': true,
      'values': [
        'base64',
        'url'
      ]
    };
    return templateInputsData;
  }

}
