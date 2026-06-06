import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../core/services/progress';
import { LessonService } from '../../core/services/lesson.service';
import { Lesson } from '../../core/models/lesson.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  searchText = '';
  selectedLevel = '';
  selectedCategory = '';

  private _lessons = signal<Lesson[]>([]);

  constructor(public progressService: ProgressService, private lessonService: LessonService) {}

  ngOnInit() {
    this.progressService.loadProgress().subscribe();
    this.lessonService.getLessons().subscribe(data => this._lessons.set(data));
  }

  get completedLessons() { return this.progressService.completedLessons(); }

  get filteredLessons(): Lesson[] {
    return this._lessons().filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesLevel = this.selectedLevel ? lesson.level?.toLowerCase() === this.selectedLevel : true;
      const matchesCategory = this.selectedCategory ? lesson.category === this.selectedCategory : true;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }
}
