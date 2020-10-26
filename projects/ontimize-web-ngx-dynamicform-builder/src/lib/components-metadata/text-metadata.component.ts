import { Component, ViewEncapsulation } from '@angular/core';

import { DEFAULT_INPUTS_METADATA, PropertyMetadataClass } from './property.metadata.class';

export const DEFAULT_INPUTS_TEXT_METADATA = [
  ...DEFAULT_INPUTS_METADATA
];

@Component({
  selector: 'text-metadata',
  templateUrl: './text-metadata.component.html',
  styleUrls: ['./property.metadata.class.scss'],
  inputs: DEFAULT_INPUTS_TEXT_METADATA,
  encapsulation: ViewEncapsulation.None
})
export class TextMetadataComponent extends PropertyMetadataClass {

  parseValue(arg) {
    if (arg !== undefined && arg !== null && this.metadata.type === 'number' && typeof arg !== 'number') {
      return parseInt(arg);
    }
    return arg;
  }
}
