export interface IConfigData {
  id: "lessons" | "subjects" | "questions" | "time";
  title: string;
  description: string;
  data: {
    value: string;
    selected: boolean;
  }[];
}
