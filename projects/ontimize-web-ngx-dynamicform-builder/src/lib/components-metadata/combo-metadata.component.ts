import { Component, EventEmitter, forwardRef, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ComponentSettingsDialogComponent } from '../component-settings-dialog.component';
import { DEFAULT_INPUTS_METADATA, PropertyMetadataClass } from './property.metadata.class';

export const DEFAULT_INPUTS_COMBO_METADATA = [
  ...DEFAULT_INPUTS_METADATA
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

  onChange: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(@Inject(forwardRef(() => ComponentSettingsDialogComponent))
  settingsDialog: ComponentSettingsDialogComponent) {
    super(settingsDialog);
  }

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.destroy();
  }

}
