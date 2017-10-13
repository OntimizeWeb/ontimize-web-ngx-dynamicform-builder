import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

import { PropertyMetadataClass } from './property.metadata.class';

export const DEFAULT_INPUTS_COMBO_METADATA = [
  ...PropertyMetadataClass.DEFAULT_INPUTS_METADATA
];

@Component({
  selector: 'combo-metadata',
  templateUrl: './combo-metadata.component.html',
  styleUrls: ['./property.metadata.class.scss'],
  inputs: [
    ...DEFAULT_INPUTS_COMBO_METADATA
  ],
  encapsulation: ViewEncapsulation.None
})
export class ComboMetadataComponent extends PropertyMetadataClass implements OnInit, OnDestroy {

  public static DEFAULT_INPUTS_COMBO_METADATA = DEFAULT_INPUTS_COMBO_METADATA;

  onChange: EventEmitter<Object> = new EventEmitter<Object>();

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.destroy();
  }

}
