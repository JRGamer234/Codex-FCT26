import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RatingService, RatingData } from '../../core/services/rating.service';

@Component({
  selector: 'app-profesor-valoraciones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profesor-valoraciones.html',
  styleUrl: './profesor-valoraciones.scss'
})
export class ProfesorValoracionesComponent implements OnInit {
  private ratingService = inject(RatingService);
  private cdr = inject(ChangeDetectorRef);

  valoraciones: RatingData[] = [];
  mediaEstrellas = '0.0';
  totalValoraciones = 0;
  loading = true;
  searchQuery = '';
  filterStars = 0;

  ngOnInit() {
    this.ratingService.getAllRatings().subscribe({
      next: data => {
        this.valoraciones = data;
        this.totalValoraciones = data.length;
        const media = data.length ? data.reduce((sum, v) => sum + v.stars, 0) / data.length : 0;
        this.mediaEstrellas = media.toFixed(1);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  get filteredValoraciones(): RatingData[] {
    const q = this.searchQuery.toLowerCase().trim();
    return this.valoraciones.filter(v => {
      const matchText = !q || v.userName?.toLowerCase().includes(q) || v.lessonTitle?.toLowerCase().includes(q) || v.comment?.toLowerCase().includes(q);
      const matchStars = !this.filterStars || v.stars === this.filterStars;
      return matchText && matchStars;
    });
  }

  starsStr(n: number): string { return '⭐'.repeat(n); }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
