import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CompletedLesson {
  title: string;
  category: string;
  icon: string;
  completedAt: string;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './progress.html',
  styleUrl: './progress.scss'
})
export class ProgressComponent {
  totalLessons = 12;

  completedLessons: CompletedLesson[] = [
    { title: 'Introducción a HTML', category: 'HTML', icon: '📖', completedAt: 'Hace 2 días' },
    { title: 'Etiquetas básicas', category: 'HTML', icon: '🏷️', completedAt: 'Hace 1 día' },
    { title: 'Selectores CSS', category: 'CSS', icon: '🎨', completedAt: 'Hoy' },
  ];

  get progressPercent(): number {
    return Math.round((this.completedLessons.length / this.totalLessons) * 100);
  }
}
