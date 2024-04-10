export interface IScoreData {
  id: keyof ICounterScore;
  label: string;
}

export interface ICounterScore {
  successes: number;
  failures: number;
  score: number;
}

export interface IUseQuizResults {
  counterScore: ICounterScore;
}
