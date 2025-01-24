import { createAction, props } from '@ngrx/store';
import {Transaction} from "../../models/transaction";

export const loadTransactions = createAction('[Transactions] Load Transactions');
export const loadTransactionsSuccess = createAction(
  '[Transactions] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);
export const loadTransactionsFailure = createAction(
  '[Transactions] Load Transactions Failure',
  props<{ error: string }>()
);

// Ajouter une transaction
export const addTransaction = createAction(
  '[Transactions] Add Transaction',
  props<{ transaction: Transaction }>()
);
export const addTransactionSuccess = createAction(
  '[Transactions] Add Transaction Success',
  props<{ transaction: Transaction }>()
);
export const addTransactionFailure = createAction(
  '[Transactions] Add Transaction Failure',
  props<{ error: string }>()
);

// Mettre à jour une transaction
export const updateTransaction = createAction(
  '[Transactions] Update Transaction',
  props<{ id: number; transaction: Transaction }>()
);
export const updateTransactionSuccess = createAction(
  '[Transactions] Update Transaction Success',
  props<{ transaction: Transaction }>()
);
export const updateTransactionFailure = createAction(
  '[Transactions] Update Transaction Failure',
  props<{ error: string }>()
);

// Supprimer une transaction
export const deleteTransaction = createAction(
  '[Transactions] Delete Transaction',
  props<{ id: number }>()
);
export const deleteTransactionSuccess = createAction(
  '[Transactions] Delete Transaction Success',
  props<{ id: number }>()
);
export const deleteTransactionFailure = createAction(
  '[Transactions] Delete Transaction Failure',
  props<{ error: string }>()
);
