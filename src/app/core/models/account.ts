enum AccountStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export interface Account {
  id?: number;
  balance: number;
  accountNumber: string;
  status: AccountStatus;
  userId?: number | null;
  bankId?: number | null;
}
