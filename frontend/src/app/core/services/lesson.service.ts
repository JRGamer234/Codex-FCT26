import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Esta interfaz coincide con el schema de Alejandro
export interface Lesson {
    _id?: string;
    title: string;
    description: string;
    content: string;
    duration: number;
    level: string;
}

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
            tap(data => this.lessons.set(data)) // Al recibirlas, actualizamos el signal
        );
    }


    getLessonById(id: string): Observable<Lesson> {
        // Asegúrate de que apiUrl sea 'http://localhost:3000/lessons'
        return this.http.get<Lesson>(`${this.apiUrl}/${id}`);
    }
}