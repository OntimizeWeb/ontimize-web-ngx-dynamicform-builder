import { Component, EventEmitter, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { DEFAULT_INPUTS_METADATA, PropertyMetadataClass } from './property.metadata.class';

export const DEFAULT_INPUTS_BOOLEAN_METADATA = [
  ...DEFAULT_INPUTS_METADATA
];

@Component({
  selector: 'boolean-metadata',
  templateUrl: './boolean-metadata.component.html',
  styleUrls: ['./property.metadata.class.scss'],
  inputs: DEFAULT_INPUTS_BOOLEAN_METADATA,
  encapsulation: ViewEncapsulation.None
})
export class BooleanMetadataComponent extends PropertyMetadataClass {

  onChange: EventEmitter<Object> = new EventEmitter<Object>();

  parseValue(arg) {
    if (arg !== undefined && arg !== null && typeof arg !== 'boolean') {
      return (arg === 'true');
    }
    return arg;
  }
}
