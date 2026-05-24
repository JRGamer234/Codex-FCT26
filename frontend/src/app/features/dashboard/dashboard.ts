import { Component, OnInit, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  private lessonService = inject(LessonService);
  lessons = this.lessonService.lessons;

  // 1. Estadísticas de progreso
  totalLessons = computed(() => this.lessons().length);
  completedLessons = computed(() => this.lessons().filter(l => l.completed).length);
  progressPercentage = computed(() => {
    const total = this.totalLessons();
    return total === 0 ? 0 : Math.round((this.completedLessons() / total) * 100);
  });

  // 2. 👉 ¡NUEVO! Saludo dinámico según la hora del sistema
  greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 20) return 'Buenas tardes';
    return 'Buenas noches';
  });

  // 3. 👉 ¡NUEVO! Busca la primera lección que NO esté completada para reanudarla
  nextLesson = computed(() => {
    return this.lessons().find(l => !l.completed) || null;
  });

  ngOnInit() {
    this.lessonService.getLessons().subscribe();
  }

  // 👉 Calcula la insignia actual basándose en el porcentaje de progreso
  currentBadge = computed(() => {
    const pct = this.progressPercentage();
    if (pct === 0) {
      return { icon: '🥚', title: 'Cascarón', desc: '¡Completa tu primera lección para empezar!' };
    }
    if (pct < 50) {
      return { icon: '🌱', title: 'Padawan del código', desc: 'Estás dando tus primeros pasos en Frontend.' };
    }
    if (pct < 100) {
      return { icon: '🔥', title: 'Código Caliente', desc: '¡Estás a más de la mitad del camino!' };
    }
    return { icon: '👑', title: 'Frontend Master', desc: '¡Has completado el 100% del temario con éxito!' };
  });

  upcomingLessons = computed(() => {
    return this.lessons().filter(l => !l.completed).slice(0, 3);
  });
}