import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { BaseToDoItem, ToDoItem } from '../../models/to-do-item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:7002/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  // It is better to have a seperate API interceptor to define headers, pre-defined url, environment and other common variables.  
  getItems(): Observable<ToDoItem[]> {
    return this.handleResponse(this.http
      .get<ToDoItem[]>(this.apiURL + '/todoItems'));
  }

  saveItem(toDoItem: BaseToDoItem): Observable<ToDoItem> {
    return this.handleResponse(this.http
      .post<ToDoItem>(
        this.apiURL + '/todoItems',
        toDoItem,
        this.httpOptions
      ));
  }

  deleteItem(id: string): Observable<ToDoItem> {
    return this.handleResponse(this.http
      .delete<ToDoItem>(
        this.apiURL + '/todoItems/'+ id,
        this.httpOptions
      ));
  }

  updateItem(id: string, todoItem: BaseToDoItem): Observable<ToDoItem> {
    return this.handleResponse(this.http
      .put<ToDoItem>(
        this.apiURL + '/todoItems/' + id,
        todoItem,
        this.httpOptions
      ));
  }

  handleResponse(observable: Observable<any>): any{
    return observable.pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ProgressEvent) {
      errorMessage = error.message;
    } else {
      errorMessage = error.error;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
