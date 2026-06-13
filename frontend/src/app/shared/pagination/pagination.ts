import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="pagination" *ngIf="totalPages > 1">
      <button class="pg-btn" (click)="go(current - 1)" [disabled]="current === 1">‹</button>
      @for (p of visiblePages; track $index) {
        @if (p === -1) {
          <span class="pg-dots">…</span>
        } @else {
          <button class="pg-btn" [class.pg-btn--active]="p === current" (click)="go(p)">{{ p }}</button>
        }
      }
      <button class="pg-btn" (click)="go(current + 1)" [disabled]="current === totalPages">›</button>
    </nav>
  `,
  styles: [`
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.3rem;
      padding: 1.5rem 0 0.5rem;
    }
    .pg-btn {
      min-width: 34px;
      height: 34px;
      padding: 0 0.5rem;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.65);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.15s;
      &:hover:not(:disabled) { background: rgba(255,255,255,0.1); color: white; }
      &:disabled { opacity: 0.3; cursor: not-allowed; }
      &--active { background: #38bdf8; border-color: #38bdf8; color: #0f172a; font-weight: 700; }
    }
    .pg-dots { color: rgba(255,255,255,0.3); padding: 0 0.15rem; font-size: 0.85rem; }

    :host-context(.light-theme) .pg-btn {
      border-color: rgba(0,0,0,0.12);
      background: rgba(0,0,0,0.03);
      color: #475569;
      &:hover:not(:disabled) { background: rgba(0,0,0,0.07); color: #0f172a; }
      &--active { background: #0284c7; border-color: #0284c7; color: white; }
    }
    :host-context(.light-theme) .pg-dots { color: rgba(0,0,0,0.3); }
  `]
})
export class PaginationComponent {
  @Input() total = 0;
  @Input() pageSize = 10;
  @Input() current = 1;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number { return Math.ceil(this.total / this.pageSize); }

  get visiblePages(): number[] {
    const tp = this.totalPages;
    const c  = this.current;
    if (tp <= 7) return Array.from({ length: tp }, (_, i) => i + 1);
    const pages: number[] = [1];
    if (c > 3) pages.push(-1);
    for (let p = Math.max(2, c - 1); p <= Math.min(tp - 1, c + 1); p++) pages.push(p);
    if (c < tp - 2) pages.push(-1);
    pages.push(tp);
    return pages;
  }

  go(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.pageChange.emit(page);
  }
}
