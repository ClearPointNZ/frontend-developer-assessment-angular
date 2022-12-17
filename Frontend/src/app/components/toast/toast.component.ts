import { Component, OnInit } from '@angular/core';

import { TOAST_DELAY } from '@constants/index';
import { LogType } from '@enums/index';
import { Toast } from '@models/index';
import { ToastService } from '@services/index';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  constructor(private toastService: ToastService) {}

  get toasts() {
    return this.toastService.toasts;
  }

  ngOnInit() {}

  ngOnDestroy() {
		this.toastService.clear();
	}

  getClassname(toast: Toast) {
    let className = '';

    switch (toast.type) {
      case LogType.ERROR:
        className = 'bg-danger text-white';
        break;
      case LogType.INFO:
        className = 'bg-info text-dark';
        break;
      case LogType.SUCCESS:
        className = 'bg-success text-white';
        break;
      case LogType.WARNING:
        className = 'bg-warning text-dark';
        break;
      default:
        className = 'bg-primary text-white';
        break;
    }

    return className;
  }

  getDelay = (toast: Toast) => toast.delay || TOAST_DELAY;

  getBody = (toast: Toast) => toast.body;

  hideToast = (toast: Toast) => this.toastService.remove(toast);
}
