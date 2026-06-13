import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isLight = signal(localStorage.getItem('theme') === 'light');

  constructor() {
    if (this.isLight()) document.body.classList.add('light-theme');
  }

  toggle() {
    const next = !this.isLight();
    this.isLight.set(next);
    localStorage.setItem('theme', next ? 'light' : 'dark');
    document.body.classList.toggle('light-theme', next);
  }
}
