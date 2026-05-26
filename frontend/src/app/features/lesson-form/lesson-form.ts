import { Component } from '@angular/core';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [],
  templateUrl: './lesson-form.html',
  styleUrl: './lesson-form.scss'
})
export class LessonFormComponent {
  currentIndex = 0;
  selectedOption: number | null = null;
  answers: (number | null)[] = [];
  finished = false;

  questions: Question[] = [
    {
      question: '¿Qué significa HTML?',
      options: [
        'HyperText Markup Language',
        'HighText Machine Language',
        'HyperText and links Markup Language',
        'None of the above'
      ],
      correct: 0
    },
    {
      question: '¿Cuál es la etiqueta correcta para un párrafo en HTML?',
      options: ['<paragraph>', '<p>', '<par>', '<pg>'],
      correct: 1
    },
    {
      question: '¿Qué propiedad CSS se usa para cambiar el color del texto?',
      options: ['text-color', 'font-color', 'color', 'foreground-color'],
      correct: 2
    },
    {
      question: '¿Qué significa CSS?',
      options: [
        'Creative Style Sheets',
        'Cascading Style Sheets',
        'Computer Style Sheets',
        'Colorful Style Sheets'
      ],
      correct: 1
    },
    {
      question: '¿Cuál es la propiedad CSS para hacer un elemento flexible?',
      options: ['display: block', 'display: flex', 'display: grid', 'display: inline'],
      correct: 1
    }
  ];

  get currentQuestion(): Question {
    return this.questions[this.currentIndex];
  }

  get score(): number {
    return this.answers.filter((a, i) => a === this.questions[i].correct).length;
  }

  selectOption(index: number) {
    this.selectedOption = index;
  }

  next() {
    if (this.selectedOption === null) return;
    this.answers.push(this.selectedOption);
    this.selectedOption = null;

    if (this.currentIndex + 1 < this.questions.length) {
      this.currentIndex++;
    } else {
      this.finished = true;
    }
  }

  restart() {
    this.currentIndex = 0;
    this.selectedOption = null;
    this.answers = [];
    this.finished = false;
  }
}
