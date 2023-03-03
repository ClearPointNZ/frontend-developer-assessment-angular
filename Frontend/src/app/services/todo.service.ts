import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateTodoCommand } from '../models/create-toto-command';
import { TodoModel } from '../models/toto-model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly API_URL = `${environment.servicesApiUrl}/todoItems`;

  public constructor(private httpClient: HttpClient) {}

  public createTodo(command: CreateTodoCommand): Observable<TodoModel> {
    return this.httpClient.post<TodoModel>(this.API_URL, command);
  }

  public deleteTodo(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }

  public getTodoList(): Observable<TodoModel[]> {
    return this.httpClient.get<TodoModel[]>(this.API_URL);
  }

  public updateTodo(command: TodoModel): Observable<TodoModel> {
    return this.httpClient.put<TodoModel>(
      `${this.API_URL}/${command.id}`,
      command
    );
  }
}
