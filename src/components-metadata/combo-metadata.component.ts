import {
  Component,
  Inject,
  forwardRef,
  OnInit,
  OnDestroy,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

import { PropertyMetadataClass } from './property.metadata.class';
import { ComponentSettingsDialogComponent } from '../component-settings-dialog.component';

export const DEFAULT_INPUTS_COMBO_METADATA = [
  ...PropertyMetadataClass.DEFAULT_INPUTS_METADATA
];

@Component({
  selector: 'combo-metadata',
  template: require('./combo-metadata.component.html'),
  styles: [require('./property.metadata.class.scss')],
  inputs: [
    ...DEFAULT_INPUTS_COMBO_METADATA
  ],
  encapsulation: ViewEncapsulation.None
})
export class ComboMetadataComponent extends PropertyMetadataClass implements OnInit, OnDestroy {

  public static DEFAULT_INPUTS_COMBO_METADATA = DEFAULT_INPUTS_COMBO_METADATA;

  onChange: EventEmitter<Object> = new EventEmitter<Object>();

  constructor( @Inject(forwardRef(() => ComponentSettingsDialogComponent))
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
