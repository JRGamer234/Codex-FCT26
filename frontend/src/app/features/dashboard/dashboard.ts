import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Lesson {
  id: string;
  title: string;
  level: string;
  category: string;
  tags: string[];
}

interface CompletedLesson {
  title: string;
  category: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  searchText = '';
  selectedLevel = '';
  selectedCategory = '';
  showProgress = false;

  completedLessons: CompletedLesson[] = [
    { title: 'Introducción a HTML', category: 'HTML', icon: '📖' },
    { title: 'Etiquetas básicas', category: 'HTML', icon: '🏷️' },
    { title: 'Selectores CSS', category: 'CSS', icon: '🎨' },
  ];

  lessons: Lesson[] = [
    { id: '1', title: 'Introducción a HTML', level: 'inicial', category: 'HTML', tags: ['html', 'básico'] },
    { id: '5', title: 'Formularios en HTML', level: 'inicial', category: 'HTML', tags: ['html', 'forms'] },
    { id: '4', title: 'Selectores Avanzados', level: 'inicial', category: 'CSS', tags: ['css', 'selectores'] },
    { id: '6', title: 'Flexbox', level: 'intermedio', category: 'Layout', tags: ['css', 'flex'] },
    { id: '7', title: 'CSS Grid', level: 'intermedio', category: 'Grid', tags: ['css', 'grid'] },
    { id: '3', title: 'Animaciones CSS', level: 'avanzado', category: 'CSS', tags: ['css', 'animaciones'] },
  ];

  get filteredLessons(): Lesson[] {
    return this.lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesLevel = this.selectedLevel ? lesson.level === this.selectedLevel : true;
      const matchesCategory = this.selectedCategory ? lesson.category === this.selectedCategory : true;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }

  toggleProgress() {
    this.showProgress = !this.showProgress;
  }
}