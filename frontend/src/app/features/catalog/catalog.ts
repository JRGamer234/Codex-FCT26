import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service';

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './catalog.html',
    styleUrl: './catalog.scss'
})
export class CatalogComponent implements OnInit {
    private lessonService = inject(LessonService);

    // Signal global del servicio con las lecciones de MongoDB
    lessons = this.lessonService.lessons;

    // RNF-03: Signal local para controlar el estado de carga elástico
    loading = signal<boolean>(true);

    // 🔐 RNF-04 / RF-01 Simulación de Rol: El lunes se enlazará con la sesión OAuth de Google
    isAdmin = signal<boolean>(true);

    ngOnInit() {
        // Sincronizamos con el Backend al arrancar
        this.lessonService.getLessons().subscribe({
            next: () => {
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }

    // Método definitivo conectado al flujo de datos del servidor
    deleteLesson(id: string | undefined, event: Event) {
        // Evitamos que al hacer clic en borrar se dispare el enlace de la tarjeta contenedora
        event.stopPropagation();
        event.preventDefault();

        // Salvaguarda: Si el ID no existe por algún motivo, detenemos la ejecución de forma segura
        if (!id) return;

        if (confirm('¿Estás seguro de que deseas eliminar esta lección permanentemente de la base de datos Codex?')) {
            // Llamada al servicio de Angular (Corregido el tipado del error)
            this.lessonService.deleteLessonFromServer(id).subscribe({
                next: () => {
                    // ¡ÉXITO! El servidor la ha borrado de MongoDB.
                    // Ahora actualizamos el Signal local para hacer el borrado visual elástico.
                    const updatedLessons = this.lessons().filter(lesson => lesson._id !== id);
                    this.lessons.set(updatedLessons);
                    alert('Lección eliminada correctamente del servidor.');
                },
                error: (err: any) => { // 👉 Tipado explícito con 'any' para solucionar el TS7006
                    console.error('Error al borrar la lección:', err);
                    alert('Error: No se pudo eliminar la lección. Comprueba que el backend de NestJS está activo.');
                }
            });
        }
    }
}