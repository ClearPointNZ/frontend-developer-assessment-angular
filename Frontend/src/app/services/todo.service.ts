import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseTodoItem, TodoItem } from '@models/index';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl: string;

  private environment = 'http://localhost:7002';

  constructor(private http: HttpClient) {
    this.apiUrl = `${this.environment}/api/todoItems`;
  }

  createTodoItem(item: BaseTodoItem) {
    return this.http.post<TodoItem>(this.apiUrl, item);
  }

  getTodoItems() {
    return this.http.get<Array<TodoItem>>(this.apiUrl);
  }

  updateTodoItem(item: TodoItem) {
    const url = `${this.apiUrl}/${item.id}`;
    return this.http.put<TodoItem>(url, item);
  }

}
