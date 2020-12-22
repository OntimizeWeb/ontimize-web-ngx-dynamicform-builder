import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'layouts-dialog',
  templateUrl: 'layouts-dialog.component.html',
  styleUrls: ['layouts-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.layouts-dialog]': 'true'
  }
})
export class LayoutsDialogComponent {
  predefinedLayouts: any[];
  basicComponents: any[];
  layoutComponents: any[];

  constructor(
    public dialogRef: MatDialogRef<LayoutsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private appDataService: AppDataService
  ) {
    this.appDataService.getLayouts().subscribe((items: any) => this.predefinedLayouts = items);
    this.basicComponents = data.basicComponents;
    this.layoutComponents = data.layoutComponents;
  }

  chooseLayout(layoutItem: any) {
    this.dialogRef.close({
      type: 'predefined-layout',
      data: layoutItem
    });
  }

  chooseComponent(componentItem: any) {
    this.dialogRef.close({
      type: 'component',
      data: componentItem
    });
  }
}
