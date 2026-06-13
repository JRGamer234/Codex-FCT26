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
  private apiUrl = '/api/users';

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.apiUrl}/alumnos`);
  }

  createAlumno(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/alumnos`, { name, email, password });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/me/password`, { currentPassword, newPassword });
  }
}
