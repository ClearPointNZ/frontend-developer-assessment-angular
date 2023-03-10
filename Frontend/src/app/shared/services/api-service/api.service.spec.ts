import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BaseToDoItem, ToDoItem } from '../../models/to-do-item';
import { of, throwError } from 'rxjs';
describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new ApiService(httpClientSpy);
    //service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected to do items', (done: DoneFn) => {
    const expectedItems: ToDoItem[] =
      [{ id: '1', description: 'A', isCompleted: false }, { id: '2', description: 'B', isCompleted: false }];
  
    httpClientSpy.get.and.returnValue(of(expectedItems));
  
    service.getItems().subscribe({
      next: response => {
        expect(response)
          .withContext('expected items')
          .toEqual(expectedItems);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should save a new expected to do item', (done: DoneFn) => {
    const expectedItem: ToDoItem =
      { id: '1', description: 'A', isCompleted: false };
  
    httpClientSpy.post.and.returnValue(of(expectedItem));
  
    service.saveItem(expectedItem).subscribe({
      next: response => {
        expect(response)
          .withContext('expected items')
          .toEqual(expectedItem);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should update a to do item', (done: DoneFn) => {
    const expectedItem: ToDoItem =
      { id: '1', description: 'A', isCompleted: true };
  
    httpClientSpy.put.and.returnValue(of(expectedItem));
  
    service.updateItem('1', expectedItem).subscribe({
      next: response => {
        expect(response)
          .withContext('expected items')
          .toEqual(expectedItem);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.put.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should delete a to do item', (done: DoneFn) => {
    const expectedItem: ToDoItem =
      { id: '1', description: 'A', isCompleted: false };
  
    httpClientSpy.delete.and.returnValue(of(expectedItem));
  
    service.deleteItem('1').subscribe({
      next: response => {
        expect(response)
          .withContext('expected items')
          .toEqual(expectedItem);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.delete.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
  
    httpClientSpy.get.and.returnValue(throwError(errorResponse));
    
    service.getItems().subscribe({
      next: () => done.fail('expected an error'),
      error: error  => {
        expect(error).toContain('test 404 error');
        done();
      }
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  
});


