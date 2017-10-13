import { DEFAULT_INPUTS_O_LIST_ITEM_CARD_IMAGE } from 'ontimize-web-ngx';
import { OListItemCardData } from './o-list-item-card.data';

export class OListItemCardImageData extends OListItemCardData {

  constructor() {
    super();
  }

  getDirective() {
    return 'o-list-item-card-image';
  }

  getInputsProperties(): Array<any> {
    let props = DEFAULT_INPUTS_O_LIST_ITEM_CARD_IMAGE;
    // TODO: next attributes need to be moved from inputs to DEFAULT_INPUTS_O_LIST_ITEM_CARD_IMAGE constant on o-list-item-card-image component on ontimize-web-ngx
    props = props.concat(['content', 'icon', 'collapsible', 'collapsed']);
    return props;
  }

  getTemplateInputsData() {
    var templateInputsData = super.getTemplateInputsData();
    templateInputsData['title'] = {
      'type': 'string',
      'label': 'title',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['subtitle'] = {
      'type': 'string',
      'label': 'subtitle',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['content'] = {
      'type': 'string',
      'label': 'content',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['image'] = {
      'type': 'string',
      'label': 'image',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['avatar'] = {
      'type': 'string',
      'label': 'avatar',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['collapsible'] = {
      'type': 'boolean',
      'label': 'collapsible',
      'tooltip': '',
      'default': false,
      'required': false
    };
    templateInputsData['collapsed'] = {
      'type': 'boolean',
      'label': 'collapsed',
      'tooltip': '',
      'default': true,
      'required': false
    };
    templateInputsData['action-1-text'] = {
      'type': 'string',
      'label': 'action-1-text',
      'tooltip': '',
      'default': null,
      'required': false
    };
    templateInputsData['action-2-text'] = {
      'type': 'string',
      'label': 'action-2-text',
      'tooltip': '',
      'default': null,
      'required': false
    };

    return templateInputsData;
  }

}
