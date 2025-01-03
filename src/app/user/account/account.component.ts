import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavComponent } from "../../layouts/nav/nav.component";
import { NgForOf, NgIf } from "@angular/common";
import { SideComponent } from "../../layouts/side/side.component";
import { AccountService } from "../../core/services/account/account.service";
import { Account, AccountStatus } from "../../core/models/account";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    FormsModule,
    NavComponent,
    // NgForOf,
    // NgIf,
    ReactiveFormsModule,
    SideComponent
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts: Account[] = [];
  loading: boolean = false;
  error: string | null = null;
  selectedAccount: Account;

  constructor(private accountService: AccountService) {
    this.selectedAccount = {
      id: undefined,
      balance: 0,
      accountNumber: '',
      status: AccountStatus.ACTIVE,
      userId: null,
      bankId: null
    };
  }

  ngOnInit(): void {
    this.loadAccount();
  }

  loadAccount(): void {
    this.loading = true;
    this.accountService.getAllAccounts().subscribe({
      next: (data: Account[]) => {
        this.accounts = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des comptes';
        this.loading = false;
      }
    });
  }
}
