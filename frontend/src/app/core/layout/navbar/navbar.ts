import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBarComponent {
  // Inyectamos el servicio global de UI para tener acceso a los signals
  uiService = inject(UiService);

  /**
   * Actualiza el signal de búsqueda en el UiService cuando el usuario escribe.
   * @param event Evento de teclado/input
   */
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.uiService.setSearchTerm(value);
  }

  /**
   * Limpia el buscador y su signal correspondiente.
   * @param inputElement Referencia al input HTML
   */
  clearSearch(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.uiService.clearSearch();
  }
}
