import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProgressService, AllProgress } from '../../core/services/progress';
import { PaginationComponent } from '../../shared/pagination/pagination';
import { AvatarComponent } from '../../shared/avatar/avatar';

interface TestResumen {
  alumno: string;
  leccion: string;
  score: number;
  total: number;
  fecha: string;
}

@Component({
  selector: 'app-profesor-tests',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PaginationComponent, AvatarComponent],
  templateUrl: './profesor-tests.html',
  styleUrl: './profesor-tests.scss'
})
export class ProfesorTestsComponent implements OnInit {
  tests: TestResumen[] = [];
  loading = true;
  error = '';
  searchQuery = '';
  page = 1;
  readonly pageSize = 8;

  constructor(private progressService: ProgressService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.progressService.getAllProgress().subscribe({
      next: (data: AllProgress[]) => {
        this.tests = data.map(p => ({
          alumno: p.userName || 'Alumno',
          leccion: p.lessonTitle,
          score: p.score ?? 0,
          total: p.total ?? 0,
          fecha: this.formatDate(p.completedAt),
        }));
        this.page = 1;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.error = `Error ${err.status}: ${err.message}`;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  get filteredTests(): TestResumen[] {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.tests;
    return this.tests.filter(t =>
      t.alumno.toLowerCase().includes(q) || t.leccion.toLowerCase().includes(q)
    );
  }

  get pagedTests(): TestResumen[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredTests.slice(start, start + this.pageSize);
  }

  private formatDate(iso: string): string {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  }

  get totalTests(): number { return this.tests.length; }

  get mediaScore(): string {
    if (!this.tests.length) return '0';
    const withTotal = this.tests.filter(t => t.total > 0);
    if (!withTotal.length) return '—';
    const media = withTotal.reduce((a, t) => a + (t.score / t.total) * 100, 0) / withTotal.length;
    return media.toFixed(0);
  }

  get perfectos(): number {
    return this.tests.filter(t => t.total > 0 && t.score === t.total).length;
  }
}
