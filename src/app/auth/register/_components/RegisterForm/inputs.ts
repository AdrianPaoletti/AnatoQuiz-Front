export interface FormRegister {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface InputsData {
  id: keyof FormRegister;
  label: string;
  type: "text" | "number" | "password";
  error: string;
  comparation?: keyof FormRegister;
  validation: (value: string, comparasion?: string) => boolean;
}

export const inputsData: InputsData[] = [
  {
    id: "username",
    label: "Username",
    type: "text",
    error: "Username should contain at least 5 characters.",
    validation: (username: string) => username.length >= 5,
  },
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
  {
    id: "repeatPassword",
    label: "Repeat password",
    type: "password",
    error: "The passwords don't much.",
    comparation: "password",
    validation: (repeatedPassword: string, password?: string) =>
      repeatedPassword === password,
  },
];
