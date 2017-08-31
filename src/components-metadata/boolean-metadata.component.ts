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

export const DEFAULT_INPUTS_BOOLEAN_METADATA = [
  ...PropertyMetadataClass.DEFAULT_INPUTS_METADATA
];

@Component({
  selector: 'boolean-metadata',
  template: require('./boolean-metadata.component.html'),
  styles: [require('./property.metadata.class.scss')],
  inputs: [
    ...DEFAULT_INPUTS_BOOLEAN_METADATA
  ],
  encapsulation: ViewEncapsulation.None
})
export class BooleanMetadataComponent extends PropertyMetadataClass implements OnInit, OnDestroy {

  public static DEFAULT_INPUTS_BOOLEAN_METADATA = DEFAULT_INPUTS_BOOLEAN_METADATA;

  onChange: EventEmitter<Object> = new EventEmitter<Object>();

  constructor( @Inject(forwardRef(() => ComponentSettingsDialogComponent))
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
