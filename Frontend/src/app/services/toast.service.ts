import { Injectable, TemplateRef } from '@angular/core';

import { Toast } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: Array<Toast> = [];

  show(type: string, body: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ type, body, ...options });
  }

  remove(toast: Toast) {
	  this.toasts = this.toasts.filter(t => t != toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
