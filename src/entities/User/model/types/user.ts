export interface User {
  username: string;
  id: number;
}

export interface UserScheme {
  authData?: User;
}
