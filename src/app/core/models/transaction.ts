import {Account} from "./account";

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
}
export enum TransactionType {
  STARTED = "STANDARD",
  INSTANT = "INSTANT",
  SCHEDULED = "SCHEDULED",
}
export interface Transaction {
  id?: number;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  sourceAccount?: Account;
  destinationAccount?: Account;
  nextExecutionDate: string;
}
