import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../../layouts/nav/nav.component";
import {SideComponent} from "../../layouts/side/side.component";
import {TransactionService} from "../../core/services/transaction/transaction.service";
import {AccountService} from "../../core/services/account/account.service";
import {Transaction, TransactionStatus, TransactionType} from "../../core/models/transaction";
import {Account} from "../../core/models/account";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    NavComponent,
    SideComponent,
    NgForOf,
    NgClass,
    FormsModule,
    NgIf,
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
  export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  accounts: Account[] = [];
  loading: boolean = false;
  error: string | null = null;
  showModal: boolean = false;
  constructor(private transactionService: TransactionService,
              private accountService: AccountService) {}
  ngOnInit() {
    this.loadTransactions();
    this.loadAccounts();
  }
  selectedTransaction: Transaction = {
    type: TransactionType.STARTED,
    amount: 0,
    status: TransactionStatus.PENDING,
    sourceAccount: undefined,
    destinationAccount: undefined,
    nextExecutionDate: ''
  };
  loadTransactions(): void {
    this.loading = true;
    this.transactionService.getAllTransaction().subscribe(
      (transactions) => {
        this.transactions = transactions;
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors du chargement des transactions';
        this.loading = false;
      }
    );
  }

  loadAccounts(): void {
    this.loading = true;
    this.accountService.getAllAccounts().subscribe(
      (response) => {
        this.accounts = response.accounts;
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors du chargement des comptes';
        this.loading = false;
      }
    );
  }

  saveTransaction(transaction: Transaction): void {
    const payload = {
      ...transaction,
      sourceAccountId: transaction.sourceAccount?.id,
      destinationAccountId: transaction.destinationAccount?.id,
    };

    const request$ = this.selectedTransaction.id
      ? this.transactionService.updateTransaction(this.selectedTransaction.id, payload)
      : this.transactionService.createTransaction(payload);

    request$.subscribe(
      () => {
        this.loadTransactions();
        this.closeModal();
        this.error = null; // Efface les erreurs en cas de succès
      },
      (error) => {
        // Gérer les erreurs en fonction de la structure renvoyée par l'API
        if (error.error?.details) {
          this.error = Object.entries(error.error.details)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
        } else if (error.error?.message) {
          this.error = error.error.message; // Utilise le message spécifique
        } else if (error.message) {
          this.error = error.message; // Fallback en cas d'erreur générique
        } else {
          this.error = 'Une erreur est survenue.'; // Message par défaut
        }
      }
    );
  }

  editTransaction(transaction: Transaction): void {
    this.selectedTransaction = {
      ...transaction,
      sourceAccount: this.accounts.find(account => account.id === transaction.sourceAccount?.id),
      destinationAccount: this.accounts.find(account => account.id === transaction.destinationAccount?.id),
    };
    this.openModal();
  }

  deleteTransaction(transactionId: number): void {
    console.log('Transaction ID à supprimer :', transactionId);
    this.transactionService.deleteTransaction(transactionId).subscribe(() => {
      this.loadTransactions();
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
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

  protected readonly TransactionStatus = TransactionStatus;
  protected readonly TransactionType = TransactionType;
}
