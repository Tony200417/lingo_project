export type Language = 'en' | 'pt';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  category: 'vocabulary' | 'grammar' | 'conversation';
  content?: string;
  quiz?: QuizQuestion[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface UserProgress {
  completedLessons: string[];
  currentLanguage: Language;
  levels: {
    en: 'A1' | 'A2' | 'B1' | 'B2';
    pt: 'A1' | 'A2' | 'B1' | 'B2';
  };
}
