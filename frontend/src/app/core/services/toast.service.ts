import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  icon: string;
  title: string;
  message: string;
  type: 'achievement' | 'default';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  toasts = this._toasts.asReadonly();
  private nextId = 0;

  show(icon: string, title: string, message: string, type: Toast['type'] = 'default', duration = 4000) {
    const id = this.nextId++;
    this._toasts.update(list => [...list, { id, icon, title, message, type }]);
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number) {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }
}
