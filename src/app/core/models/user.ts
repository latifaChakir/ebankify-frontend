export interface Role {
  id: number;
  name: string;
}
export interface User {
  id?: number;
  name: string;
  email: string;
  age: number | null;
  password: string;
  roles: Role[];
  active : boolean;
  creditScore: number | null;
  monthlyIncome :number | null;
}
