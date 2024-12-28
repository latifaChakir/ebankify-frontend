export interface User {
  id?: number;
  name: string;
  email: string;
  age: number | null;
  password: string;
  roles: number[];
  active : boolean;
  creditScore: number;
  monthlyIncome :number;
}
