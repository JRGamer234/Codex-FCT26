import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alumno {
  name: string;
  email: string;
  progress: number;
  completedLessons: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.apiUrl}/alumnos`);
  }
}
