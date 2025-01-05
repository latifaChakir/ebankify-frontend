import {User} from "./user";

export enum InvoiceStatus {
  UNPAID= "UNPAID",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
}
export interface Invoice {
  id?: number;
  amountDue: number | null,
  dueDate: string,
  user?: User;
  status: InvoiceStatus;
}
