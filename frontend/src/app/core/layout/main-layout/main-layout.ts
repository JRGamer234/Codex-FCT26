import { Component, signal, computed } from '@angular/core'; // Añadimos computed para la reactividad
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

// Definimos la interfaz para mantener el tipado fuerte que exige NestJS/Angular
interface Lesson {
  id: number;
  title: string;
  level: 'Inicial' | 'Intermedio' | 'Avanzado';
  icon: string;
  route: string;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {
  // 1. Signal con la base de datos de lecciones (Estado inicial)
  lessons = signal<Lesson[]>([
    { id: 1, title: 'Introducción a HTML', level: 'Inicial', icon: '📖', route: '/lesson' },
    { id: 2, title: 'Flexbox y Grid', level: 'Intermedio', icon: '🎨', route: '#' },
    { id: 3, title: 'Animaciones CSS', level: 'Avanzado', icon: '🚀', route: '#' },
    { id: 4, title: 'Selectores Avanzados', level: 'Inicial', icon: '🎯', route: '#' }
  ]);

  // 2. Signal para capturar lo que el usuario escribe en el buscador (RF-03)
  searchTerm = signal<string>('');

  // 3. Signal Computado: Se recalcula automáticamente cuando 'lessons' o 'searchTerm' cambian.
  // Esto es lo que el profesor evaluará como "Reactividad con Signals" (RNF-03).
  filteredLessons = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    // Si no hay búsqueda, devolvemos todas
    if (!term) return this.lessons();

    // Si hay búsqueda, filtramos por título
    return this.lessons().filter(lesson =>
      lesson.title.toLowerCase().includes(term)
    );
  });

  /**
   * Método para actualizar el término de búsqueda desde el HTML
   * @param event Evento de entrada del teclado
   */
  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}