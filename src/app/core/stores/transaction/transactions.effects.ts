import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of,  switchMap } from 'rxjs';
import {TransactionService} from "../../services/transaction/transaction.service";
import * as TransactionActions from './transactions.actions';


@Injectable()
export class TransactionsEffects {
  constructor(
    private actions$: Actions,
    private transactionService: TransactionService
  ) {}

  LoadTransactions = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactions),
      switchMap(() =>
        this.transactionService.getAllTransaction().pipe(
          map((transactions) => TransactionActions.loadTransactionsSuccess({ transactions })),
          catchError((error) => of(TransactionActions.loadTransactionsFailure({ error: error.message })))
        )
      )
    )
  );

  AddTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.addTransaction),
      switchMap(({ transaction }) =>
        this.transactionService.createTransaction(transaction).pipe(
          map((transaction) => TransactionActions.addTransactionSuccess({ transaction })),
          catchError((error) => of(TransactionActions.addTransactionFailure({ error: error.message })))
        )
      )
    )
  );

  addTransactionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.addTransaction),
      map(() => TransactionActions.loadTransactions())
    )
  );



  updateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.updateTransaction),
      mergeMap(({ id, transaction }) =>
        this.transactionService.updateTransaction(id, transaction).pipe(
          map((updatedTransaction) =>
            TransactionActions.updateTransactionSuccess({ transaction: updatedTransaction })
          ),
          catchError((error) =>
            of(TransactionActions.updateTransactionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.deleteTransaction),
      mergeMap(({ id }) =>
        this.transactionService.deleteTransaction(id).pipe(
          map(() => TransactionActions.deleteTransactionSuccess({ id })),
          catchError((error) =>
            of(TransactionActions.deleteTransactionFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
