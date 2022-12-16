import { TestBed } from '@angular/core/testing';

import { Toast } from '@models/index';
import { ToastService } from './toast.service';

describe('Service: Toast', () => {
  const toast: Toast = { type: 'type', body: 'body' };
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService]
    });

    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show', () => {
    service.show(toast.type, toast.body);
    expect(service.toasts).toEqual([toast]);

    service.show(toast.type, toast.body);
    expect(service.toasts).toEqual([toast, toast]);
  });

  it('should remove', () => {
    service.toasts = [toast];
    service.remove(toast);
    expect(service.toasts).toEqual([]);
  });

  it('should clear', () => {
    service.toasts = [toast];
    service.clear();
    expect(service.toasts).toEqual([]);
  });
});
