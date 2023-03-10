import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ForbiddenItemsDirective } from 'src/app/shared/directives/forbidden-item/forbidden-items.directive';

import { ToDoItemsFormComponent } from './to-do-items-form.component';

describe('ToDoItemsFormComponent', () => {
  let component: ToDoItemsFormComponent;
  let fixture: ComponentFixture<ToDoItemsFormComponent>;
  let compiled: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoItemsFormComponent, ForbiddenItemsDirective ],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => { 
    expect(compiled.querySelector('h1')?.textContent).toContain('Add Item');
  });

  it('should display the label', () => {
    expect(compiled.querySelector('label')?.textContent).toContain('Description');
  });

  it('should display the error message when input contains cat',fakeAsync(() => {
    expect(compiled.querySelector('.alert')).toBeNull();
    let input = compiled.querySelector('input');
    input.value='cat';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(compiled.querySelector('.alert')).toBeTruthy();
  }));

  it('should display the error message when input is invalid',fakeAsync(() => {
    expect(compiled.querySelector('.alert')).toBeNull();
    let input = compiled.querySelector('input');
    input.value='cat';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(compiled.querySelector('.alert')).toBeTruthy();
  }));

  it('should display the error message when errorMsg changes', () => {
    expect(compiled.querySelector('.alert')).toBeNull();
    component.errorMsg = 'duplicated';
    fixture.detectChanges();
    expect(compiled.querySelector('.alert')).toBeTruthy();
  });

  it('Add button should be disabled when invalid input', fakeAsync(() => {
    let input = compiled.querySelector('input');
    input.value='cat';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(compiled.querySelector('#add-button').disabled).toBeTruthy();
  }));

  it('Clear button should clear any input', () => {
    compiled.querySelector('#clear-button').click();
    fixture.detectChanges();
    let input = compiled.querySelector('input');
    expect(input.value).toEqual('');
  });
  
});
