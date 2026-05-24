import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Lesson } from '../models/lesson.model'; // 👉 ¡CORREGIDO! Importamos la interfaz centralizada para que no se duplique

@Injectable({
    providedIn: 'root'
})
export class LessonService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/lessons';

    // Este Signal guardará las lecciones reales de la base de datos
    lessons = signal<Lesson[]>([]);

    getLessons(): Observable<Lesson[]> {
        return this.http.get<Lesson[]>(this.apiUrl).pipe(
            tap(data => this.lessons.set(data)) // Al recibirlas, actualizamos el signal de la lista
        );
    }

    getLessonById(id: string): Observable<Lesson> {
        return this.http.get<Lesson>(`${this.apiUrl}/${id}`);
    }

    createLesson(lesson: Lesson): Observable<Lesson> {
        return this.http.post<Lesson>(this.apiUrl, lesson).pipe(
            tap(newLesson => {
                this.lessons.update(current => [...current, newLesson]);
            })
        );
    }

    // 👉 ¡PERFECTO! Mantiene la base de datos sincronizada y actualiza el Signal global al vuelo
    updateLessonStatus(lessonId: string, completed: boolean): Observable<Lesson> {
        return this.http.patch<Lesson>(`${this.apiUrl}/${lessonId}/completed`, { completed }).pipe(
            tap(() => {
                this.lessons.update(currentLessons =>
                    currentLessons.map(l =>
                        l._id === lessonId ? { ...l, completed: completed } : l
                    )
                );
            })
        );
    }
}