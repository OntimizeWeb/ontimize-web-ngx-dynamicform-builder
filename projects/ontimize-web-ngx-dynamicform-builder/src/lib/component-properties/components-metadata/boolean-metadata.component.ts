import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable, Subject } from 'rxjs';

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
  protected valueChangeSubject = new Subject<any>();

  parseValue(arg) {
    if (arg !== undefined && arg !== null && typeof arg !== 'boolean') {
      return (arg === 'true');
    }
    return arg;
  }

  change(val: MatSlideToggleChange) {
    this.valueChangeSubject.next(val.checked);
  }

  protected getValueChangesObservable(): Observable<any> {
    return this.valueChangeSubject.asObservable();
  }

}
