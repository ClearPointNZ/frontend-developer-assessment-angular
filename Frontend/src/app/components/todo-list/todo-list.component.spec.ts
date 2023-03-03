import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { TodoModel } from 'src/app/models/toto-model';
import { TodoService } from 'src/app/services/todo.service';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  const mockList = [
    { id: 'o1hj3b2hHw', description: 'One' },
    { id: 'S1gFlRLksW', description: 'Two', isCompleted: true },
    { id: '6gkQahV46K', description: 'Three' },
  ];

  const mockNewTodo = { id: '6gkQahV234g', description: 'Four' };

  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let deleteTodo$: Observable<void>;
  let getTodoList$: Observable<TodoModel[]>;
  let updateTodo$: Observable<TodoModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: TodoService,
          useValue: {
            deleteTodo: (): Observable<void> => deleteTodo$,
            getTodoList: (): Observable<TodoModel[]> => getTodoList$,
            updateTodo: (): Observable<TodoModel> => updateTodo$,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    deleteTodo$ = of();
    getTodoList$ = of(mockList);
    fixture.detectChanges();
  });

  it('should get todo list', () => {
    expect(component.todoList.length).toBe(3);
  });

  it('the todo list should be in alphabetical order', () => {
    const descriptions = component.todoList.map((todo) => todo.description);

    expect(descriptions).toEqual(['One', 'Three', 'Two']);
  });

  it('should add new todo to the list', () => {
    expect(component.todoList.length).toBe(3);

    getTodoList$ = of([...mockList, mockNewTodo]);

    component.todoAdded();

    expect(component.todoList.length).toBe(4);
  });

  it('the todo list should be in alphabetical order after adding a new todo', () => {
    getTodoList$ = of([...mockList, mockNewTodo]);

    component.todoAdded();

    const descriptions = component.todoList.map((todo) => todo.description);
    expect(descriptions).toEqual(['Four', 'One', 'Three', 'Two']);
  });

  it('should mark todo complete when marked complete', () => {
    updateTodo$ = of(mockList[0]);

    component.onMarkComplete(mockList[0]);

    expect(component.todoList[0].isCompleted).toBeTrue();
  });
});
