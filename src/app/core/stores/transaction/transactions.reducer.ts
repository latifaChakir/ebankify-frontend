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
    loading: true,  // Pas de chargement depuis une API
    error: null,
  })),
  on(TransactionActions.addTransaction, (state, { transaction }) => ({
    ...state,
    transactions: [...state.transactions, transaction],
  })),
  on(TransactionActions.updateTransaction, (state, { id, transaction }) => ({
    ...state,
    transactions: state.transactions.map((t) =>
      t.id === id ? { ...t, ...transaction } : t
    ),
  })),
  on(TransactionActions.deleteTransaction, (state, { id }) => ({
    ...state,
    transactions: state.transactions.filter((t) => t.id !== id),
  }))


);
