export interface IAuthFormError {
  id: string;
  text: string;
}

export interface ILoginParams {
  id: string;
  email: string;
  password: string;
}

export interface IGoogleUserInfo {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: string;
}
