import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Achievement {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss'
})
export class AchievementsComponent {
  achievements: Achievement[] = [
    { icon: '🚀', title: 'Primer paso', description: 'Completa tu primera lección', unlocked: true, unlockedAt: 'Hace 3 días' },
    { icon: '🔥', title: 'En racha', description: 'Completa 3 lecciones seguidas', unlocked: true, unlockedAt: 'Hace 1 día' },
    { icon: '🏆', title: 'Campeón HTML', description: 'Supera todas las lecciones de HTML', unlocked: false },
    { icon: '🎨', title: 'Artista CSS', description: 'Supera todas las lecciones de CSS', unlocked: false },
    { icon: '⚡', title: 'Velocista', description: 'Completa un test en menos de 2 minutos', unlocked: false },
    { icon: '💯', title: 'Perfeccionista', description: 'Saca 100% en un test', unlocked: false },
    { icon: '📚', title: 'Estudioso', description: 'Completa 10 lecciones', unlocked: false },
    { icon: '🌟', title: 'Maestro', description: 'Completa el curso entero', unlocked: false },
  ];

  get unlockedCount(): number {
    return this.achievements.filter(a => a.unlocked).length;
  }
}