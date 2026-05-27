import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService, Alumno } from '../../core/services/user';

@Component({
  selector: 'app-profesor-alumnos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profesor-alumnos.html',
  styleUrl: './profesor-alumnos.scss'
})
export class ProfesorAlumnosComponent implements OnInit {
  alumnos: Alumno[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAlumnos().subscribe(data => {
      this.alumnos = data;
    });
  }
}