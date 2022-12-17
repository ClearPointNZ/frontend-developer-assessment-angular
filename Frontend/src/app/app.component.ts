import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseTodoItem, TodoItem } from '@models/index';
import { TodoService } from '@services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TodoList';
  todoInput = '';
  todoItem!: BaseTodoItem;
  todoItems: Array<TodoItem> = [];

  private readonly unsubscribe$ = new Subject<void>();

  constructor(private todoService: TodoService) {}

  get totalOfItems() {
    return this.todoItems.length;
  }

  trackById(index: number, item: TodoItem) {
    return item.id;
  }

  ngOnInit() {
    this.getTodoItems();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  clearInput() {
    this.todoInput = '';
  }

  createTodoItem() {
    this.todoItem = new BaseTodoItem(this.todoInput.trim());

    this.todoService.createTodoItem(this.todoItem)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: TodoItem) => {
        this.todoItems.unshift(data);
        this.clearInput();
      })
  }

  getTodoItems() {
    this.todoService.getTodoItems()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Array<TodoItem>) => {
        this.todoItems = data.reverse();
      })
  }
}
