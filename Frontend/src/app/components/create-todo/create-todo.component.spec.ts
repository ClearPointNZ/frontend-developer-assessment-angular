import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { TodoModel } from 'src/app/models/toto-model';
import { TodoService } from 'src/app/services/todo.service';

import { CreateTodoComponent } from './create-todo.component';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;

  let createTodo$: Observable<TodoModel>;

  const mockNewTodo = { id: '6gkQahV234g', description: 'One' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTodoComponent],
      imports: [HttpClientModule],
      providers: [
        FormBuilder,
        {
          provide: TodoService,
          useValue: {
            createTodo: (): Observable<TodoModel> => createTodo$,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;

    createTodo$ = of(mockNewTodo);

    fixture.detectChanges();
  });

  it('should create a todo', () => {
    spyOn(component.itemAdded, 'emit');

    component.form.controls.description.setValue('One');
    component.onAddItem();

    expect(component.itemAdded.emit).toHaveBeenCalled();
  });

  it('should clear input after creating', () => {
    component.form.controls.description.setValue('One');
    component.onAddItem();

    expect(component.form.value.description).toBeNull();
  });

  it('should not allow disallowed words', () => {
    spyOn(component.itemAdded, 'emit');

    const control = component.form.controls.description;
    control.setValue('cat');

    expect(control.invalid).toBeTrue();
    expect(component.form.value.description).toEqual('cat');
    expect(component.itemAdded.emit).not.toHaveBeenCalled();
  });
});
