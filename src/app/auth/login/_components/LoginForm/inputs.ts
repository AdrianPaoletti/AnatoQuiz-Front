export interface FormLogin {
  email: string;
  password: string;
}

interface InputsData {
  id: keyof FormLogin;
  label: string;
  type: "text" | "number" | "password";
  error: string;
  validation: (value: string, comparasion?: string) => boolean;
}

export const inputsData: InputsData[] = [
  {
    id: "email",
    label: "Email",
    type: "text",
    error: "Invalid email format.",
    validation: (email: string) =>
      new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(email),
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    error:
      "Password must contain an uppercase, a lowercase, a numeric character and a special character.",
    validation: (password: string) =>
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}",
      ).test(password),
  },
];
