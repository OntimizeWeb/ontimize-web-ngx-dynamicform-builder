import { Component, EventEmitter, forwardRef, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ComponentSettingsDialogComponent } from '../component-settings-dialog.component';
import { PropertyMetadataClass, DEFAULT_INPUTS_METADATA } from './property.metadata.class';

export const DEFAULT_INPUTS_TEXT_METADATA = [
  ...DEFAULT_INPUTS_METADATA
];

export const DEFAULT_OUTPUTS_TEXT_METADATA = [
  'onChange'
];

@Component({
  selector: 'text-metadata',
  templateUrl: './text-metadata.component.html',
  styleUrls: ['./property.metadata.class.scss'],
  inputs: [
    ...DEFAULT_INPUTS_TEXT_METADATA
  ],
  outputs: [
    ...DEFAULT_OUTPUTS_TEXT_METADATA
  ],
  encapsulation: ViewEncapsulation.None
})
export class TextMetadataComponent extends PropertyMetadataClass implements OnInit, OnDestroy {

  onChange: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(@Inject(forwardRef(() => ComponentSettingsDialogComponent))
  settingsDialog: ComponentSettingsDialogComponent) {
    super(settingsDialog);
  }

  parseValue(arg) {
    if (arg !== undefined && arg !== null && this.data.type === 'number' && typeof arg !== 'number') {
      return parseInt(arg);
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
