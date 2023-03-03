import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { disallowValuesValidator } from './disallow.validator';

@Component({
  template: '<input type="text" [formControl]="control">',
})
class TestComponent {
  public control = new FormControl('', [
    disallowValuesValidator(['cat', 'dog']),
  ]);
}

describe('DisallowValidator', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be valid when empty', () => {
    expect(component.control.valid).toBeTrue();

    component.control.setValue('');

    fixture.detectChanges();

    expect(component.control.valid).toBeTrue();
  });

  it('should be valid with allowed word', () => {
    expect(component.control.valid).toBeTrue();

    component.control.setValue('abc');

    fixture.detectChanges();

    expect(component.control.valid).toBeTrue();
  });

  it('should be invalid with disallowed word', () => {
    expect(component.control.valid).toBeTrue();

    component.control.setValue('cat');

    fixture.detectChanges();

    expect(component.control.valid).toBeFalse();
  });

  it('should be invalid with disallowed word with capitalisation', () => {
    expect(component.control.valid).toBeTrue();

    component.control.setValue('cAt');

    fixture.detectChanges();

    expect(component.control.valid).toBeFalse();
  });
});
