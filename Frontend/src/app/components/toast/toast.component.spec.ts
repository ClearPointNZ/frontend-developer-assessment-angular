import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TOAST_DELAY } from '@constants/index';
import { LogType } from '@enums/index';
import { Toast } from '@models/index';
import { ToastService } from '@services/index';
import { ToastComponent } from './toast.component';

describe('Component: Toast', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let fakeToastService: ToastService;

  let toast: Toast = {type: '', body: ''};

  beforeEach(async () => {
    fakeToastService = jasmine.createSpyObj<ToastService>(
      'ToastService',
      {
        show: undefined,
        remove: undefined,
        clear: undefined,
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ ToastComponent ],
      providers: [
        { provide: ToastService, useValue: fakeToastService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should getClassname', () => {
    expect(component.getClassname(toast)).toBe('bg-primary text-white');

    toast.type = LogType.ERROR;
    expect(component.getClassname(toast)).toBe('bg-danger text-white');

    toast.type = LogType.INFO;
    expect(component.getClassname(toast)).toBe('bg-info text-dark');

    toast.type = LogType.SUCCESS;
    expect(component.getClassname(toast)).toBe('bg-success text-white');

    toast.type = LogType.WARNING;
    expect(component.getClassname(toast)).toBe('bg-warning text-dark');
  });

  it('should getDelay', () => {
    expect(component.getDelay(toast)).toBe(TOAST_DELAY);

    const delay = 1000;
    toast = {...toast, delay}
    expect(component.getDelay(toast)).toBe(delay);
  });

  it('should getBody', () => {
    expect(component.getBody(toast)).toBe('');

    const body = 'body';
    toast.body = body
    expect(component.getBody(toast)).toBe(body);
  });

  it('should hideToast', () => {
    component.hideToast(toast);
    expect(fakeToastService.remove).toHaveBeenCalled();
  });
});
