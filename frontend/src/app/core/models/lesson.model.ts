export interface LessonSection {
  title: string;
  content: string;
  code?: string;
}

export interface LessonQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface Lesson {
  _id?: string;
  title: string;
  description: string;
  level: string;
  category: string;
  sections?: LessonSection[];
  questions?: LessonQuestion[];
  createdBy?: string;
}
