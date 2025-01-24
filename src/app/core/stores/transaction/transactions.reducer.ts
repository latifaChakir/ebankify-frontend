import { createReducer, on } from '@ngrx/store';
import * as TransactionActions from './transactions.actions';
import {Transaction} from "../../models/transaction";

export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
};

export const transactionsReducer = createReducer(
  initialState,
  on(TransactionActions.loadTransactions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TransactionActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    loading: false,
  })),
  on(TransactionActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TransactionActions.addTransactionSuccess, (state, { transaction }) => ({
    ...state,
    transactions: [...state.transactions, transaction],
  })),
  on(TransactionActions.updateTransactionSuccess, (state, { transaction }) => ({
    ...state,
    transactions: state.transactions.map((t) =>
      t.id === transaction.id ? transaction : t
    ),
  })),
  on(TransactionActions.deleteTransactionSuccess, (state, { id }) => ({
    ...state,
    transactions: state.transactions.filter((t) => t.id !== id),
  }))
);
