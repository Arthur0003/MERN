export interface IToken {
  name?: string;
  email?: string;
  token: string;
}

export interface UserData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  user: IToken | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | undefined;
}
