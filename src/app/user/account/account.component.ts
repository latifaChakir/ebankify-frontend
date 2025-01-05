import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavComponent} from "../../layouts/nav/nav.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {SideComponent} from "../../layouts/side/side.component";
import {AccountService} from "../../core/services/account/account.service";
import {Account , AccountStatus} from "../../core/models/account";
import {User} from "../../core/models/user";
import {UserService} from "../../core/services/user/user.service";
import {Bank} from "../../core/models/bank";
import {BankService} from "../../core/services/bank/bank.service";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    FormsModule,
    NavComponent,
    ReactiveFormsModule,
    SideComponent,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  accounts: Account[] = [];
  loading: boolean = false;
  error: string | null = null;
  showModal: boolean = false;
  users: User[] = [];
  banks: Bank[] = [];

  constructor(private accountServce : AccountService,
              private userService: UserService,
              private bankService : BankService) {}

  ngOnInit() {
    this.loadAccounts();
    this.loadUsers();
    this.loadBanks();
  }
  selectedAccount: Account = {
    balance: null,
    accountNumber: '',
    status: AccountStatus.ACTIVE,
    user: undefined,
    bank: undefined
  };
  loadAccounts(): void {
    this.loading = true;
    this.accountServce.getAllAccounts().subscribe(
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
  loadBanks(): void {
    this.loading = true;
    this.bankService.getAllBanks().subscribe(
      (response) => {
        this.banks = response;
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors du chargement des banques';
        this.loading = false;
      }
    );
  }
  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
      }
    );
  }
  saveAccount(account: Account) {
    // Map the user and bank objects to their respective IDs
    const payload = {
      ...account,
      userId: account.user?.id, // Extract the user ID
      bankId: account.bank?.id, // Extract the bank ID
    };

    if (this.selectedAccount.id) {
      this.accountServce.updateAccount(this.selectedAccount.id, payload).subscribe(
        () => {
          this.loadAccounts();
          this.closeModal();
        },
        (error) => {
          this.error = 'Erreur lors de la mise à jour du compte';
        }
      );
    } else {
      this.accountServce.saveAccount(payload).subscribe(
        () => {
          this.loadAccounts();
          this.closeModal();
        },
        (error) => {
          this.error = 'Erreur lors de la création du compte';
        }
      );
    }
  }
  editAccount(account: Account) {
    this.selectedAccount = { ...account };
    this.openModal();
  }

  deleteAccount(accountid: number) {
    this.accountServce.deleteAccount(accountid).subscribe(()=>{
      this.loadAccounts();
    });
  }

  openModal(): void
  {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedAccount = {
      balance: null,
      accountNumber: '',
      status: AccountStatus.ACTIVE,
      user: undefined,
      bank: undefined
    };
  }


}
