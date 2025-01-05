import {User} from "./user";
import {Bank} from "./bank";

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export interface Account {
  id?: number;
  balance: number | null;
  accountNumber: string;
  status: AccountStatus;
  user?: User;
  bank?: Bank;
}
