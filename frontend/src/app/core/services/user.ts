import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Alumno {
  name: string;
  email: string;
  progress: number;
  completedLessons: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // URL del backend cuando esté listo

  // Datos simulados mientras el backend no está listo
private mockAlumnos: Alumno[] = [
  { name: 'Alex', email: 'alex@codex.com', progress: 30, completedLessons: 2 },
  { name: 'Jorge', email: 'jorge@codex.com', progress: 45, completedLessons: 3 },
  { name: 'Mario', email: 'mario@codex.com', progress: 60, completedLessons: 4 },
  { name: 'Itziar', email: 'itziar@codex.com', progress: 55, completedLessons: 5 },
];

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<Alumno[]> {
    // Cuando el backend esté listo, cambiar por:
    // return this.http.get<Alumno[]>(`${this.apiUrl}/users`);
    return of(this.mockAlumnos);
  }

  getAlumnoProgress(id: string): Observable<Alumno> {
    // Cuando el backend esté listo, cambiar por:
    // return this.http.get<Alumno>(`${this.apiUrl}/users/${id}/progress`);
    return of(this.mockAlumnos[0]);
  }
}