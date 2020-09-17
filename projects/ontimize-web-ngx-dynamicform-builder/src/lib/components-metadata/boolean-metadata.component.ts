import { Component, EventEmitter, forwardRef, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ComponentSettingsDialogComponent } from '../component-settings-dialog.component';
import { DEFAULT_INPUTS_METADATA, PropertyMetadataClass } from './property.metadata.class';

export const DEFAULT_INPUTS_BOOLEAN_METADATA = [
  ...DEFAULT_INPUTS_METADATA
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

  onChange: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(@Inject(forwardRef(() => ComponentSettingsDialogComponent))
  settingsDialog: ComponentSettingsDialogComponent) {
    super(settingsDialog);
  }

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
