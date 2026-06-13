import { Component, Input, computed, signal } from '@angular/core';

const PALETTE = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#3b82f6', '#ef4444', '#14b8a6',
];

function colorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

@Component({
  selector: 'app-avatar',
  standalone: true,
  template: `
    <div class="avatar" [style.width.px]="size" [style.height.px]="size"
         [style.background]="color" [style.font-size.px]="size * 0.38"
         [title]="name">
      {{ initials }}
    </div>
  `,
  styles: [`
    .avatar {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
      letter-spacing: 0.02em;
      user-select: none;
    }
  `],
})
export class AvatarComponent {
  @Input() name = '';
  @Input() size = 40;

  get initials() { return initialsFor(this.name || '?'); }
  get color() { return colorForName(this.name || '?'); }
}
