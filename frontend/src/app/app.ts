import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './core/components/toast/toast.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styles: [`
    .theme-toggle {
      position: fixed;
      bottom: 1.25rem;
      right: 1.25rem;
      z-index: 9999;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.07);
      backdrop-filter: blur(8px);
      color: rgba(255,255,255,0.7);
      font-size: 1.15rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .theme-toggle:hover { background: rgba(255,255,255,0.14); color: white; transform: scale(1.08); }

    :host-context(.light-theme) .theme-toggle {
      border-color: rgba(0,0,0,0.12);
      background: rgba(255,255,255,0.85);
      color: #475569;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    }
    :host-context(.light-theme) .theme-toggle:hover { background: #ffffff; color: #0f172a; }
  `]
})
export class App {
  readonly themeService = inject(ThemeService);
}
