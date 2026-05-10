import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- Esto es clave

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet], // <-- Esto también
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent { } // <-- Este nombre debe coincidir con el de routes.ts