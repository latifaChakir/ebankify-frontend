import { Component } from '@angular/core';
import {Transaction} from "../../core/models/transaction";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as TransactionActions from '../../core/stores/transaction/transactions.actions';
import {
  selectAllTransactions,
  selectTransactionsError,
  selectTransactionsLoading
} from "../../core/stores/transaction/transactions.selectors";
import {AppState} from "../../app-state";

@Component({
  selector: 'app-transaction-cart',
  standalone: true,
  imports: [],
  templateUrl: './transaction-cart.component.html',
  styleUrl: './transaction-cart.component.css'
})
export class TransactionCartComponent {
  transactions$: Observable<Transaction[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.transactions$ = this.store.select(selectAllTransactions);
    this.loading$ = this.store.select(selectTransactionsLoading);
    this.error$ = this.store.select(selectTransactionsError);
  }

  ngOnInit(): void {
    this.store.dispatch(TransactionActions.loadTransactions());
  }

  addTransaction(transaction: Transaction): void {
    this.store.dispatch(TransactionActions.addTransaction({ transaction }));
  }

  updateTransaction(id: number, transaction: Transaction): void {
    this.store.dispatch(TransactionActions.updateTransaction({ id, transaction }));
  }

  deleteTransaction(id: number): void {
    this.store.dispatch(TransactionActions.deleteTransaction({ id }));
  }
}
