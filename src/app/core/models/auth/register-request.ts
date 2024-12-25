export interface RegisterRequest {
  name: string;
  email: string;
  age: number | null;
  password: string;
  roles: number[];
  active : boolean;
}
