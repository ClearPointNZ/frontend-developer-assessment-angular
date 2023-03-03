import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { TodoModel } from 'src/app/models/toto-model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todoList: TodoModel[] = [];

  public get completeItemsCount(): number {
    return this.todoList?.filter((t) => t.isCompleted)?.length || 0;
  }

  public get incompleteItemsCount(): number {
    return this.todoList?.length - this.completeItemsCount || 0;
  }

  public constructor(private todoService: TodoService) {}

  public ngOnInit(): void {
    this.refreshList();
  }

  public onDelete(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => this.refreshList());
  }

  public onMarkComplete(todo: TodoModel): void {
    todo.isCompleted = true;

    this.todoService.updateTodo(todo).subscribe();
  }

  public todoAdded(): void {
    this.refreshList();
  }

  private refreshList(): void {
    this.todoService
      .getTodoList()
      .pipe(map((list) => list.sort(this.sortByDescription)))
      .subscribe((result) => (this.todoList = result));
  }

  private sortByDescription = (a: TodoModel, b: TodoModel): number =>
    a.description.localeCompare(b.description);
}
