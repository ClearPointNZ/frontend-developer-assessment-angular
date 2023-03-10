import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appForbiddenItems]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenItemsDirective, multi: true }]
})
export class ForbiddenItemsDirective implements Validator {

  @Input('appForbiddenItems') forbiddenItems: string[] = [];
  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (this.forbiddenItems && control.value) {
      for (const item of this.forbiddenItems) {
        if (control.value.toLowerCase().includes(item.toLowerCase())) {
          return {
            forbiddenItems: true
          };
        }
      }
    }
    return null;
  }


}
