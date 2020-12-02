import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'choose-selector-dialog',
  templateUrl: 'choose-selector-dialog.component.html',
  styleUrls: ['choose-selector-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.choose-selector-dialog]': 'true'
  }
})
export class ChooseSelectorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ChooseSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  chooseSelector(selector: string) {
    this.dialogRef.close(selector);
  }
}
