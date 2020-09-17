import { ChangeDetectorRef, Component, ElementRef, forwardRef, Injector, NgZone, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_INPUTS_O_FORM, DEFAULT_OUTPUTS_O_FORM, OFormComponent, OntimizeServiceProvider } from 'ontimize-web-ngx';

@Component({
  selector: 'extended-form',
  providers: [
    OntimizeServiceProvider,
    {
      provide: OFormComponent,
      useExisting: forwardRef(() => ExtendedFormComponent)
    }
  ],
  templateUrl: './o-form.component.html',
  styleUrls: ['./o-form.component.scss'],
  inputs: DEFAULT_INPUTS_O_FORM,
  outputs: DEFAULT_OUTPUTS_O_FORM,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.o-form]': 'true',
    '[class.extended-form]': 'true'
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

  public isInitialStateChanged(): boolean {
    return false;
  }

}
