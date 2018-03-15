import { Injector, forwardRef, NgZone, ChangeDetectorRef, ElementRef, ViewEncapsulation, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OFormComponent, OntimizeService, dataServiceFactory } from 'ontimize-web-ngx';

@Component({
  selector: 'extended-form',
  providers: [
    { provide: OntimizeService, useFactory: dataServiceFactory, deps: [Injector] },
    {
      provide: OFormComponent,
      useExisting: forwardRef(() => ExtendedFormComponent)
    }
  ],
  templateUrl: './o-form.component.html',
  inputs: OFormComponent.DEFAULT_INPUTS_O_FORM,
  outputs: OFormComponent.DEFAULT_OUTPUTS_O_FORM,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.o-form]': 'true',
    '[class.fill]': 'layoutFill'
  }
})

export class ExtendedFormComponent extends OFormComponent {
  constructor(
    router: Router,
    actRoute: ActivatedRoute,
    zone: NgZone,
    cd: ChangeDetectorRef,
    injector: Injector,
    elRef: ElementRef
  ) {
    super(router, actRoute, zone, cd, injector, elRef);
  }

  isInitialStateChanged(): boolean {
    return false;
  }

}
