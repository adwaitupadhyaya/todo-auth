export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  permissions: string[];
}

export interface GetUserQuery {
  q?: string;
  size?: number;
  page?: number;
}
