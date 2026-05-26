import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Lesson {
  id: string;
  title: string;
  level: string;
  category: string;
  tags: string[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  searchText = '';
  selectedLevel = '';
  selectedCategory = '';

  lessons: Lesson[] = [
    { id: '1', title: 'Introducción a HTML', level: 'inicial', category: 'HTML', tags: ['html', 'básico'] },
    { id: '2', title: 'Formularios en HTML', level: 'inicial', category: 'HTML', tags: ['html', 'forms'] },
    { id: '3', title: 'Selectores CSS', level: 'inicial', category: 'CSS', tags: ['css', 'selectores'] },
    { id: '4', title: 'Flexbox', level: 'intermedio', category: 'Layout', tags: ['css', 'flex'] },
    { id: '5', title: 'CSS Grid', level: 'intermedio', category: 'Grid', tags: ['css', 'grid'] },
    { id: '6', title: 'Animaciones CSS', level: 'avanzado', category: 'CSS', tags: ['css', 'animaciones'] },
  ];

  get filteredLessons(): Lesson[] {
    return this.lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesLevel = this.selectedLevel ? lesson.level === this.selectedLevel : true;
      const matchesCategory = this.selectedCategory ? lesson.category === this.selectedCategory : true;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }
}