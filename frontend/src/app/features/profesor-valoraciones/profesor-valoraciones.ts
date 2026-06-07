import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RatingService, RatingData } from '../../core/services/rating.service';

@Component({
  selector: 'app-profesor-valoraciones',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profesor-valoraciones.html',
  styleUrl: './profesor-valoraciones.scss'
})
export class ProfesorValoracionesComponent implements OnInit {
  private ratingService = inject(RatingService);

  valoraciones: RatingData[] = [];
  mediaEstrellas = '0.0';
  totalValoraciones = 0;
  loading = true;

  ngOnInit() {
    this.ratingService.getAllRatings().subscribe({
      next: data => {
        this.valoraciones = data;
        this.totalValoraciones = data.length;
        const media = data.length ? data.reduce((sum, v) => sum + v.stars, 0) / data.length : 0;
        this.mediaEstrellas = media.toFixed(1);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  starsStr(n: number): string {
    return '⭐'.repeat(n);
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
