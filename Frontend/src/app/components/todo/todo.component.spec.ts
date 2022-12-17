import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TodoItem } from '@models/index';
import { TodoService } from '@services/index';
import { TodoComponent } from './todo.component';

describe('Component: Todo', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let fakeTodoService: TodoService;

  const todo: TodoItem = { id: '1', description: '1', isCompleted: false };
  const newTodo: TodoItem = {...todo, isCompleted: !todo.isCompleted};

  beforeEach(async () => {
    fakeTodoService = jasmine.createSpyObj<TodoService>(
      'TodoService',
      {
        createTodoItem: undefined,
        getTodoItems: undefined,
        updateTodoItem: of(newTodo),
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: TodoService, useValue: fakeTodoService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = todo;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should toggleCompleted', () => {
    component.toggleCompleted();
    expect(fakeTodoService.updateTodoItem).toHaveBeenCalled();
    expect(component.todo).toEqual(newTodo);
  });
});
