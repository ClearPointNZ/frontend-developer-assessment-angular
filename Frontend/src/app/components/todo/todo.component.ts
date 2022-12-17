import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TodoItem } from '@models/index';
import { TodoService } from '@services/index';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo!: TodoItem;
  @Input() todoInput!: string;

  newTodo!: TodoItem;

  private readonly unsubscribe$ = new Subject<void>();

  constructor(public todoService: TodoService) { }

  get description() {
    return this.todo.description;
  }

  get isCompleted() {
    return this.todo.isCompleted;
  }

  get isExisting() {
    return this.todo.description === this.todoInput;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggleCompleted() {
    this.newTodo = {...this.todo, isCompleted: !this.todo.isCompleted};

    this.todoService.updateTodoItem(this.newTodo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: TodoItem) => {
        this.todo = data;
      })
  }
}
