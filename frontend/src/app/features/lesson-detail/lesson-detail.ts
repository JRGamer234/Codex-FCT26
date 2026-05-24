import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service';
import { Lesson } from '../../core/models/lesson.model';
import { MarkdownComponent } from 'ngx-markdown';
import { CommonModule } from '@angular/common'; // 👉 1. Asegúrate de importar CommonModule para usar clases dinámicas

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [MarkdownComponent, CommonModule], // 👉 2. Añade CommonModule aquí
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.scss'
})
export class LessonDetailComponent implements OnInit {
  lesson = signal<Lesson | null>(null);

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.lessonService.getLessonById(id).subscribe(data => {
          this.lesson.set(data);
        });
      }
    });
  }

  toggleComplete() {
    const currentLesson = this.lesson();

    // Validamos que exista la lección y que tenga un ID válido de MongoDB
    if (currentLesson && currentLesson._id) {
      const targetStatus = !currentLesson.completed;

      // 1. Actualización reactiva e instantánea en la interfaz usando el Signal
      const updated: Lesson = {
        ...currentLesson,
        completed: targetStatus
      };
      this.lesson.set(updated);

      // 2. Persistencia real en la Base de Datos a través del servicio HTTP
      this.lessonService.updateLessonStatus(currentLesson._id, targetStatus).subscribe({
        next: (savedLesson) => {
          console.log('¡Estado de progreso sincronizado con éxito en MongoDB!', savedLesson.completed);
        },
        error: (err) => {
          console.error('Error al persistir el progreso en el servidor:', err);
          // Si por lo que sea el servidor falla, revertimos el botón a su estado original por seguridad
          this.lesson.set(currentLesson);
          alert('No se pudo guardar tu progreso. Revisa la conexión con el backend.');
        }
      });
    }
  }
}