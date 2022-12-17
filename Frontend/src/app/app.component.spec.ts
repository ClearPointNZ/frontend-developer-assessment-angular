import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { TodoItem } from '@models/index';
import { TodoService } from '@services/index';
import { AppComponent } from './app.component';

describe('Component: App', () => {
  let component: AppComponent;
  let compiled: HTMLElement;
  let fixture: ComponentFixture<AppComponent>;
  let fakeTodoService: TodoService;

  const todoInput = 'todo input';
  const todo: TodoItem = { id: '1', description: todoInput, isCompleted: false };

  beforeEach(async () => {
    fakeTodoService = jasmine.createSpyObj<TodoService>(
      'TodoService',
      {
        createTodoItem: of(todo),
        getTodoItems: of([todo]),
        updateTodoItem: undefined,
      }
    );

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: TodoService, useValue: fakeTodoService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();

    component.todoInput = todoInput;
    component.todoItems = [];
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'TodoList'`, () => {
    expect(component.title).toEqual('TodoList');
  });

  it('should clearInput', () => {
    component.clearInput();
    expect(component.todoInput).toBe('');
  });

  it('should createTodoItem', () => {
    component.createTodoItem();
    expect(fakeTodoService.createTodoItem).toHaveBeenCalled();
    expect(component.todoItems).toEqual([todo]);
    fixture.detectChanges();
    expect(compiled.querySelector('.total-item')?.textContent).toContain('Showing 1 Item(s)');

    component.createTodoItem();
    expect(fakeTodoService.createTodoItem).toHaveBeenCalled();
    expect(component.todoItems).toEqual([todo, todo]);
    fixture.detectChanges();
    expect(compiled.querySelector('.total-item')?.textContent).toContain('Showing 2 Item(s)');
  });

  it('should getTodoItems', () => {
    component.getTodoItems();
    expect(fakeTodoService.getTodoItems).toHaveBeenCalled();
    expect(component.todoItems).toEqual([todo]);

    fixture.detectChanges();
    expect(compiled.querySelector('.total-item')?.textContent).toContain('Showing 1 Item(s)');
  });

  it('should show empty list', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.empty-list')?.textContent).toContain(`You got an empty list. Let's add some To-Dos.`);
  });
});
