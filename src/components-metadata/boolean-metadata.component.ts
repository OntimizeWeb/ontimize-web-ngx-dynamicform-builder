import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

import { PropertyMetadataClass } from './property.metadata.class';

export const DEFAULT_INPUTS_BOOLEAN_METADATA = [
  ...PropertyMetadataClass.DEFAULT_INPUTS_METADATA
];

@Component({
  selector: 'boolean-metadata',
  templateUrl: './boolean-metadata.component.html',
  styleUrls: ['./property.metadata.class.scss'],
  inputs: [
    ...DEFAULT_INPUTS_BOOLEAN_METADATA
  ],
  encapsulation: ViewEncapsulation.None
})
export class BooleanMetadataComponent extends PropertyMetadataClass implements OnInit, OnDestroy {

  public static DEFAULT_INPUTS_BOOLEAN_METADATA = DEFAULT_INPUTS_BOOLEAN_METADATA;

  onChange: EventEmitter<Object> = new EventEmitter<Object>();

  parseValue(arg) {
    if (arg !== undefined && arg !== null && typeof arg !== 'boolean') {
      return (arg === 'true');
    }
    return arg;
  }

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.destroy();
  }

}
