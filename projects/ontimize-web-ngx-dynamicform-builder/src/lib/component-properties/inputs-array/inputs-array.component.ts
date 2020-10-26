import { Component, Input } from '@angular/core';

import { InputMetadata } from '../../types/inputs-metadata.type';

@Component({
  selector: 'inputs-array',
  templateUrl: './inputs-array.component.html'
})
export class InputsArrayComponent {

  public _inputsMetadata: InputMetadata[] = [];

  get inputsMetadata(): InputMetadata[] {
    return this._inputsMetadata;
  }

  @Input()
  set inputsMetadata(value: InputMetadata[]) {
    this._inputsMetadata = value;
  }
}
