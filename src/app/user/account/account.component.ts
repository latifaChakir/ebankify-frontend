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
import {AuthService} from "../../core/services/auth/auth.service";

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
  isAdmin: boolean = false;
  users: User[] = [];
  banks: Bank[] = [];
  selectedAccount: Account = {
    balance: null,
    accountNumber: '',
    status: AccountStatus.ACTIVE,
    user: undefined,
    bank: undefined
  };

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private bankService: BankService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAccounts();
    this.loadUsers();
    this.loadBanks();
    this.isAdmin = this.authService.getRole() === 'ADMIN';
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

  loadBanks(): void {
    this.bankService.getAllBanks().subscribe(
      (response) => {
        this.banks = response;
      },
      (error) => {
        this.error = 'Erreur lors du chargement des banques';
      }
    );
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.error = 'Erreur lors du chargement des utilisateurs';
      }
    );
  }

  async saveAccount(account: Account) {
    try {
      const payload: any = {
        ...account,
        userId: account.user?.id,
        bankId: account.bank?.id,
      };

      if (!this.isAdmin) {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await this.userService.getUserById(Number(userId)).toPromise();
          if (response?.user?.id) {
            payload.userId = response.user.id;
          } else {
            this.error = "Utilisateur introuvable ou réponse invalide";
            return;
          }
        } else {
          this.error = "Utilisateur non identifié";
          return;
        }
      }

      if (this.selectedAccount.id) {
        this.accountService.updateAccount(this.selectedAccount.id, payload).subscribe(
          () => {
            this.loadAccounts();
            this.closeModal();
          },
          () => {
            this.error = 'Erreur lors de la mise à jour du compte';
          }
        );
      } else {
        this.accountService.saveAccount(payload).subscribe(
          () => {
            this.loadAccounts();
            this.closeModal();
          },
          () => {
            this.error = 'Erreur lors de la création du compte';
          }
        );
      }
    } catch (error) {
      this.error = "Erreur lors de la récupération des informations utilisateur";
    }
  }

  editAccount(account: Account) {
    this.selectedAccount = {
      ...account,
      user: this.users.find(user => user.id === account.user?.id),
      bank: this.banks.find(bank => bank.id === account.bank?.id)
    };
    this.openModal();
  }

  deleteAccount(accountId: number) {
    this.accountService.deleteAccount(accountId).subscribe(() => {
      this.loadAccounts();
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetSelectedAccount();
  }

  private resetSelectedAccount(): void {
    this.selectedAccount = {
      balance: null,
      accountNumber: '',
      status: AccountStatus.ACTIVE,
      user: undefined,
      bank: undefined
    };
  }
}
