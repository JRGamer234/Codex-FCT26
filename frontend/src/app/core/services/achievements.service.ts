import { Injectable, inject, computed, effect } from '@angular/core';
import { ProgressService } from './progress';
import { LessonService } from './lesson.service';
import { ToastService } from './toast.service';

export interface Achievement {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class AchievementsService {
  private progressService = inject(ProgressService);
  private lessonService = inject(LessonService);
  private toastService = inject(ToastService);

  private knownUnlocked = new Set<string>();
  private initialized = false;

  achievements = computed((): Achievement[] => {
    const completed = [...this.progressService.completedLessons()].sort(
      (a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime(),
    );
    const allLessons = this.lessonService.lessons();
    const completedIds = new Set(completed.map(l => l.lessonId));

    const htmlLessons = allLessons.filter(l => l.category?.toLowerCase() === 'html');
    const cssLessons = allLessons.filter(l => l.category?.toLowerCase() === 'css');
    const htmlDone = htmlLessons.length > 0 && htmlLessons.every(l => l._id && completedIds.has(l._id));
    const cssDone = cssLessons.length > 0 && cssLessons.every(l => l._id && completedIds.has(l._id));

    const dateStr = (idx: number) => {
      if (completed.length > idx) {
        return new Date(completed[idx].completedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      }
      return '';
    };

    return [
      {
        icon: '🚀', title: 'Primer paso', description: 'Completa tu primera lección',
        unlocked: completed.length >= 1, unlockedAt: completed.length >= 1 ? dateStr(0) : undefined,
      },
      {
        icon: '🔥', title: 'En racha', description: 'Completa 3 lecciones',
        unlocked: completed.length >= 3, unlockedAt: completed.length >= 3 ? dateStr(2) : undefined,
      },
      {
        icon: '🏆', title: 'Campeón HTML', description: 'Supera todas las lecciones de HTML',
        unlocked: htmlDone, unlockedAt: htmlDone ? dateStr(completed.length - 1) : undefined,
      },
      {
        icon: '🎨', title: 'Artista CSS', description: 'Supera todas las lecciones de CSS',
        unlocked: cssDone, unlockedAt: cssDone ? dateStr(completed.length - 1) : undefined,
      },
      {
        icon: '⚡', title: 'Velocista', description: 'Completa un test en menos de 2 minutos',
        unlocked: false,
      },
      {
        icon: '💯', title: 'Perfeccionista', description: 'Saca 100% en un test',
        unlocked: false,
      },
      {
        icon: '📚', title: 'Estudioso', description: 'Completa 5 lecciones',
        unlocked: completed.length >= 5, unlockedAt: completed.length >= 5 ? dateStr(4) : undefined,
      },
      {
        icon: '🌟', title: 'Maestro', description: 'Completa el curso entero',
        unlocked: allLessons.length > 0 && completed.length >= allLessons.length,
        unlockedAt: allLessons.length > 0 && completed.length >= allLessons.length ? dateStr(completed.length - 1) : undefined,
      },
    ];
  });

  unlockedCount = computed(() => this.achievements().filter(a => a.unlocked).length);

  constructor() {
    effect(() => {
      const loaded = this.progressService.progressLoaded();
      const current = this.achievements();
      const unlocked = current.filter(a => a.unlocked);

      if (!loaded) return;

      if (!this.initialized) {
        // Primera carga: registrar el estado actual sin notificar
        this.knownUnlocked = new Set(unlocked.map(a => a.title));
        this.initialized = true;
        return;
      }

      // Detectar logros nuevos
      const newlyUnlocked = unlocked.filter(a => !this.knownUnlocked.has(a.title));
      newlyUnlocked.forEach(a => {
        this.toastService.show(a.icon, '¡Logro desbloqueado!', a.title, 'achievement');
      });
      this.knownUnlocked = new Set(unlocked.map(a => a.title));
    }, { allowSignalWrites: true });
  }
}
