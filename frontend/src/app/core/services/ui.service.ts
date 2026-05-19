import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // Signal para el término de búsqueda de lecciones
  searchTerm = signal<string>('');

  // Signal para controlar si el sidebar está colapsado o abierto
  sidebarOpen = signal<boolean>(true);

  /**
   * Actualiza el término de búsqueda global.
   * @param term Nuevo término de búsqueda
   */
  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  /**
   * Limpia el término de búsqueda.
   */
  clearSearch(): void {
    this.searchTerm.set('');
  }

  /**
   * Alterna la visibilidad del sidebar lateral.
   */
  toggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }
}
