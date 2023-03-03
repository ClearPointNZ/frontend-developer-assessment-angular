import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { TodoModel } from '../models/toto-model';
import { environment } from 'src/environments/environment';
import { CreateTodoCommand } from '../models/create-toto-command';

describe('TodoService', () => {
  let httpTestingController: HttpTestingController;
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can get todoList', () => {
    const mockResponse: TodoModel[] = [
      { id: 'o1hj3b2hHw', description: 'One' },
      { id: 'S1gFlRLksW', description: 'Two', isCompleted: true },
      { id: '6gkQahV46K', description: 'Three' },
    ];

    service.getTodoList().subscribe((result) =>
      expect(result)
        .withContext('todoList does not match expected ' + result.length)
        .toEqual(mockResponse, 'should return expected results')
    );

    const request = httpTestingController.expectOne(
      `${environment.servicesApiUrl}/todoItems`
    );

    expect(request.request.method).toEqual('GET');

    request.flush(mockResponse);
  });

  it('can create todo', () => {
    const command: CreateTodoCommand = { description: 'One' };
    const mock: TodoModel = { id: 'o1hj3b2hHw', description: 'One' };

    service.createTodo(command).subscribe((result) =>
      expect(result)
        .withContext('create todo does not match expected ' + result)
        .toEqual(mock, 'should return expected results')
    );

    const request = httpTestingController.expectOne(
      `${environment.servicesApiUrl}/todoItems`
    );

    expect(request.request.method).toEqual('POST');

    request.flush(mock);
  });

  it('can update todo', () => {
    const mock: TodoModel = {
      id: 'o1hj3b2hHw',
      description: 'One',
      isCompleted: true,
    };

    service.updateTodo(mock).subscribe((result) =>
      expect(result)
        .withContext('update todo does not match expected ' + result)
        .toEqual(mock, 'should return expected results')
    );

    const request = httpTestingController.expectOne(
      `${environment.servicesApiUrl}/todoItems/${mock.id}`
    );

    expect(request.request.method).toEqual('PUT');

    request.flush(mock);
  });

  it('can delete todo', () => {
    const id = 'o1hj3b2hHw';

    service.deleteTodo(id).subscribe((result) =>
      expect(result)
        .withContext('delete does not match expected ' + result)
        .toBeNull('should return null')
    );

    const request = httpTestingController.expectOne(
      `${environment.servicesApiUrl}/todoItems/${id}`
    );

    expect(request.request.method).toEqual('DELETE');

    request.flush(null);
  });
});
