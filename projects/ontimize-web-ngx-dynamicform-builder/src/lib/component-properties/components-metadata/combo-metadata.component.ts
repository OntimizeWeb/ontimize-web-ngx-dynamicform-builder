import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';

import { DEFAULT_INPUTS_METADATA, PropertyMetadataClass } from './property.metadata.class';

export const DEFAULT_INPUTS_COMBO_METADATA = [
  ...DEFAULT_INPUTS_METADATA
];

@Component({
  selector: 'combo-metadata',
  templateUrl: './combo-metadata.component.html',
  styleUrls: ['./property.metadata.class.scss'],
  inputs: DEFAULT_INPUTS_COMBO_METADATA,
  encapsulation: ViewEncapsulation.None
})
export class ComboMetadataComponent extends PropertyMetadataClass {

  onChange: EventEmitter<Object> = new EventEmitter<Object>();
}
