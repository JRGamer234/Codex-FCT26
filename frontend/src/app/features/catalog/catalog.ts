import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service'; // Asegúrate de que esta ruta apunte a tu LessonService

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './catalog.html',
    styleUrl: './catalog.scss'
})
export class CatalogComponent implements OnInit {
    private lessonService = inject(LessonService);

    // Consumimos el Signal global donde guardas las lecciones traídas de MongoDB
    lessons = this.lessonService.lessons;

    ngOnInit() {
        // Sincronizamos con la Base de Datos al entrar al catálogo para traer lo último que haya guardado Alejandro
        this.lessonService.getLessons().subscribe();
    }
}