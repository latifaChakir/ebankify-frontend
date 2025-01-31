import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Transaction, TransactionStatus, TransactionType } from '../../core/models/transaction';
import * as TransactionActions from '../../core/stores/transaction/transactions.actions';
import {
  selectAllTransactions,
  selectTransactionsError,
  selectTransactionsLoading,
} from '../../core/stores/transaction/transactions.selectors';
import { AsyncPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavComponent } from "../../layouts/nav/nav.component";
import { Account } from "../../core/models/account";
import { AccountService } from "../../core/services/account/account.service";
import { SideComponent } from "../../layouts/side/side.component";
import {AppState} from "../../app-state";
import { TransactionService } from '../../core/services/transaction/transaction.service';
import { v4 as uuidv4 } from 'uuid'; // Importer UUID pour générer des IDs uniques


@Component({
  selector: 'app-transaction-cart',
  templateUrl: './transaction-cart.component.html',
  styleUrls: ['./transaction-cart.component.css'],
  imports: [
    AsyncPipe,
    NgIf,
    FormsModule,
    NavComponent,
    NgForOf,
    NgClass,
    SideComponent
  ],
  standalone: true
})
export class TransactionCartComponent implements OnInit {
  transactions: Transaction[] = [];
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  accounts: Account[] = [];
  showModal: boolean = false;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loadingAccounts$ = this.loadingSubject.asObservable();

  selectedTransaction: Transaction = {
    type: TransactionType.STARTED,
    amount: 0,
    status: TransactionStatus.PENDING,
    sourceAccount: undefined,
    destinationAccount: undefined,
    nextExecutionDate: ''
  };

  constructor(
    private store: Store<AppState>,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {
    this.loading$ = this.store.select(selectTransactionsLoading);
    this.error$ = this.store.select(selectTransactionsError);
  }

  ngOnInit(): void {
    this.loadTransactions();
    this.loadAccounts();
  }

  loadTransactions(): void {
    this.store.dispatch(TransactionActions.loadTransactions());
    this.store.select(selectAllTransactions).subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  loadAccounts(): void {
    this.loadingSubject.next(true);
    this.accountService.getAllAccounts().subscribe({
      next: (response) => {
        this.accounts = response.accounts;
        this.loadingSubject.next(false);
      },
      error: () => {
        this.loadingSubject.next(false);
        console.error('Erreur lors du chargement des comptes');
      }
    });
  }

  saveTransaction(transaction: Transaction): void {
    if (!this.selectedTransaction.amount || this.selectedTransaction.amount <= 0) {
      console.error("Le montant de la transaction doit être supérieur à 0.");
      return;
    }

    const payload: Transaction = {
      ...this.selectedTransaction,
      id: this.selectedTransaction.id || parseInt(uuidv4(), 16), // Générer un ID s'il n'existe pas
      sourceAccount: this.selectedTransaction.sourceAccount,
      destinationAccount: this.selectedTransaction.destinationAccount,
    };

    if (this.selectedTransaction.id) {
      this.store.dispatch(TransactionActions.updateTransaction({ id: this.selectedTransaction.id, transaction: payload }));
    } else {
      this.store.dispatch(TransactionActions.addTransaction({ transaction: payload }));
    }

    this.closeModal();
    this.resetSelectedTransaction();
  }
  resetSelectedTransaction(): void {
    this.selectedTransaction = {
      type: TransactionType.STARTED,
      amount: 0,
      status: TransactionStatus.PENDING,
      sourceAccount: undefined,
      destinationAccount: undefined,
      nextExecutionDate: ''
    };
  }

  deleteTransaction(id: number): void {
    console.log("id" +id);
    if (!id) {
      console.log("L'ID de la transaction est invalide.");
      return;
    }
    this.store.dispatch(TransactionActions.deleteTransaction({ id }));
  }
  editTransaction(transaction: Transaction): void {
    this.selectedTransaction = {
      ...transaction,
      sourceAccount: this.accounts.find(account => account.id === transaction.sourceAccount?.id),
      destinationAccount: this.accounts.find(account => account.id === transaction.destinationAccount?.id),
    };
    this.openModal();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  resetCart(): void {
    this.transactions.forEach(transaction => {
      if (transaction.id !== undefined) {
        this.store.dispatch(TransactionActions.deleteTransaction({ id: transaction.id }));
      } else {
        console.error("Transaction sans ID détectée, suppression ignorée :", transaction);
      }
    });
    console.log("Toutes les transactions ont été supprimées.");
  }

  saveAllToDatabase(): void {
    this.transactionService.getAllTransaction().subscribe(existingTransactions => {
      const existingIds = new Set(existingTransactions.map(t => t.id));

      const newTransactions: Transaction[] = this.transactions.filter(transaction => !existingIds.has(transaction.id));

      if (newTransactions.length === 0) {
        console.log("Aucune nouvelle transaction à sauvegarder.");
        return;
      }

      newTransactions.forEach(transaction => {
        const payload = {
          ...transaction,
          sourceAccountId: transaction.sourceAccount?.id, // Récupère l'ID du compte source
          destinationAccountId: transaction.destinationAccount?.id, // Récupère l'ID du compte de destination
        };

        this.transactionService.createTransaction(payload).subscribe({
          next: () => console.log(`Transaction ${transaction.id} sauvegardée avec succès.`),
          error: (error) => {
            // Gérer les erreurs en fonction de la structure renvoyée par l'API
            if (error.error?.details) {
              console.error(Object.entries(error.error.details)
                .map(([field, message]) => `${field}: ${message}`)
                .join(', '));
            } else if (error.error?.message) {
              console.error(error.error.message);
            } else if (error.message) {
              console.error(error.message);
            } else {
              console.error('Une erreur est survenue.');
            }
          },
        });
      });
    });
  }

  protected readonly TransactionType = TransactionType;
  protected readonly TransactionStatus = TransactionStatus;
}
