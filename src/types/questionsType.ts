export interface IQuestionsResponse {
  questions: IQuestion[];
}

export interface IQuestion {
  id: string;
  subject: string;
  lessons: string[];
  question: string;
  answers: IAnswer[];
  difficulty: number;
  active: boolean;
  corretAnswer: string;
}

export interface IAnswer {
  id: string;
  answer: string;
}
