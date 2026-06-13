import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService, Alumno } from '../../core/services/user';

@Component({
  selector: 'app-profesor-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profesor-alumnos.html',
  styleUrl: './profesor-alumnos.scss'
})
export class ProfesorAlumnosComponent implements OnInit {
  alumnos: Alumno[] = [];
  loading = true;
  error = '';
  searchQuery = '';

  showForm = false;
  newName = '';
  newEmail = '';
  newPassword = '';
  saving = false;
  formError = '';

  deletingId: string | null = null;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.loadAlumnos(); }

  loadAlumnos() {
    this.loading = true;
    this.userService.getAlumnos().subscribe({
      next: data => { this.alumnos = data; this.loading = false; this.cdr.detectChanges(); },
      error: err => { this.error = `Error ${err.status}: ${err.message}`; this.loading = false; this.cdr.detectChanges(); },
    });
  }

  get filteredAlumnos(): Alumno[] {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.alumnos;
    return this.alumnos.filter(a =>
      a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
    );
  }

  submitForm() {
    if (!this.newName || !this.newEmail || !this.newPassword) {
      this.formError = 'Rellena todos los campos';
      return;
    }
    this.saving = true;
    this.formError = '';
    this.userService.createAlumno(this.newName, this.newEmail, this.newPassword).subscribe({
      next: () => {
        this.saving = false;
        this.showForm = false;
        this.newName = this.newEmail = this.newPassword = '';
        this.cdr.detectChanges();
        this.loadAlumnos();
      },
      error: err => {
        this.formError = err.error?.message || `Error ${err.status}`;
        this.saving = false;
        this.cdr.detectChanges();
      },
    });
  }

  eliminarAlumno(id: string) {
    if (!confirm('¿Eliminar este alumno? Se perderán todos sus datos de progreso.')) return;
    this.deletingId = id;
    this.userService.deleteAlumno(id).subscribe({
      next: () => {
        this.alumnos = this.alumnos.filter(a => a._id !== id);
        this.deletingId = null;
        this.cdr.detectChanges();
      },
      error: () => { this.deletingId = null; this.cdr.detectChanges(); },
    });
  }
}
