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

  showForm = false;
  newName = '';
  newEmail = '';
  newPassword = '';
  saving = false;
  formError = '';

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAlumnos();
  }

  loadAlumnos() {
    this.loading = true;
    this.userService.getAlumnos().subscribe({
      next: data => { this.alumnos = data; this.loading = false; this.cdr.detectChanges(); },
      error: err => { this.error = `Error ${err.status}: ${err.message}`; this.loading = false; this.cdr.detectChanges(); },
    });
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
}
