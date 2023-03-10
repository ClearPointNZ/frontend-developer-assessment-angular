import { AbstractControl, FormControl } from '@angular/forms';
import { ForbiddenItemsDirective } from './forbidden-items.directive';

describe('ForbiddenItemsDirective', () => {
  const control = new FormControl('input');
  it('should create an instance', () => {
    const directive = new ForbiddenItemsDirective();
    expect(directive).toBeTruthy();
  });

  it('should return null when forbiddenItems is empty', () => {
    const directive = new ForbiddenItemsDirective();
    directive.forbiddenItems = [];
    
    control.setValue('');
    expect(directive.validate(control)).toBeNull();
  });

  it('should return invalid when forbiddenItems is ["cat", "yes"] while control value contains cat or yes', () => {
    const directive = new ForbiddenItemsDirective();
    directive.forbiddenItems = ['cat', 'yes'];
    
    control.setValue('acatb');
    expect(directive.validate(control)).toEqual({forbiddenItems: true});
    control.setValue('catb');
    expect(directive.validate(control)).toEqual({forbiddenItems: true});
    control.setValue('cat');
    expect(directive.validate(control)).toEqual({forbiddenItems: true});
    control.setValue('yesa');
    expect(directive.validate(control)).toEqual({forbiddenItems: true});
  });

  it('should return null when forbiddenItems is ["cat"] while control value doesn`t contain cat', () => {
    const directive = new ForbiddenItemsDirective();
    directive.forbiddenItems = ['cat'];  
    control.setValue('test');
    expect(directive.validate(control)).toBeNull();

  });
});
