import { Component, ViewChild } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(TodoListComponent) public todoListComponent!: TodoListComponent;

  public title = 'TodoList';

  public itemAdded(): void {
    this.todoListComponent.todoAdded();
  }
}
