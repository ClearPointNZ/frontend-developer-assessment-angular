import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { BaseTodoItem, TodoItem } from '@models/index';
import { TodoService } from './todo.service';

describe('Service: Todo', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  let req: TestRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should createTodoItem', () => {
    const item: BaseTodoItem = { description: '1', isCompleted: false };
    const testData: TodoItem = { id: '1', ...item};

    service.createTodoItem(item)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    req = httpMock.expectOne(service.apiUrl);

    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it('should getTodoItems', () => {
    const testData: Array<TodoItem> = [
      { id: '1', description: '1', isCompleted: false },
      { id: '2', description: '2', isCompleted: false },
    ];

    service.getTodoItems()
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    req = httpMock.expectOne(service.apiUrl);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('should updateTodoItem', () => {
    const testData: TodoItem = { id: '1', description: '1', isCompleted: true };

    service.updateTodoItem(testData)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    req = httpMock.expectOne(`${service.apiUrl}/${testData.id}`);

    expect(req.request.method).toEqual('PUT');

    req.flush(testData);
  });
});
