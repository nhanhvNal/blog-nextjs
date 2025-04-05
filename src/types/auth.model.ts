export interface FormDataSignUp {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
  isSignUp?: boolean;
}

export type TokenInfo = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};
