export interface IKeysConfig {
  lessons: string;
  subjects: string;
  questions: string;
  time: string;
}
export interface IConfig {
  id: keyof IKeysConfig;
  title: string;
  description: string;
  color: "orange" | "blue" | "orange-light" | "pink";
  data: IData[];
}

export interface IData {
  value: string;
  selected: boolean;
}

export interface IDataQuiz {
  lessons: string[];
  subjects: string[];
  questions: string;
  time: string;
}

export interface IParamsGetQuestions {
  lessons: string;
  subjects?: string;
  questionsNumber: number;
}
