export interface ICurrentQuestion {
  id: string;
  question: string;
  answers: { id: string; answer: string }[];
  correctAnswer: string;
}
