export interface IGetOTPParams {
  email: string;
  value: string;
}

export interface IPutOTPRequestBody {
  email: string;
  subject: OTPSubjects;
}

export type OTPSubjects = "registration" | "changePassword";
