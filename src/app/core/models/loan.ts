import {User} from "./user";

export interface Loan {
  id?: number;
  principal: number | null;
  interestRate: number | null,
  termMonths: number | null,
  approved: boolean,
  user?: User;
}
