import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../../layouts/nav/nav.component";
import {SideComponent} from "../../layouts/side/side.component";
import {LoanService} from "../../core/services/loan/loan.service";
import {UserService} from "../../core/services/user/user.service";
import {Loan} from "../../core/models/loan";
import {User} from "../../core/models/user";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [
    NavComponent,
    SideComponent,
    NgForOf,
    NgClass,
    NgIf,
    FormsModule
  ],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.css'
})
export class LoanComponent implements OnInit{
  loans: Loan[] = [];
  users: User[] = [];
  loading: boolean = false;
  error: string | null = null;
  showModal: boolean = false;
  constructor(private loanService:LoanService,
              private userService:UserService) {
  }
ngOnInit() {
    this.loadLoans();
    this.loadUsers();
}
  selectedLoan: Loan = {
    principal: null,
    interestRate: null,
    termMonths: null,
    approved: false,
    user: undefined
  };
  loadLoans(): void {
    this.loading = true;
    this.loanService.getAllLoans().subscribe(
      (loans) => {
        this.loans = loans;
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors du chargement des prêts';
        this.loading = false;
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

  saveLoan(loan: Loan): void {
    const payload = {
      ...loan,
      userId :loan.user?.id
    }
    if (this.selectedLoan.id) {
      this.loanService.updateLoan(this.selectedLoan.id, payload).subscribe(() => {
        this.loadLoans();
        this.closeModal();
      });
    } else {
      this.loanService.createLoan(payload).subscribe(() => {
        this.loadLoans();
        this.closeModal();
      });
    }
  }

  editLoan(loan: Loan): void {
    this.selectedLoan = { ...loan,
      user: this.users.find(user => user.id === loan.user?.id),
    };
    this.openModal();
  }

  deleteLoan(loanId: number): void {
    this.loanService.deleteLoan(loanId).subscribe(() => {
      this.loadLoans();
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetSelectedLoan();
  }

  resetSelectedLoan(): void {
    this.selectedLoan = {
      principal: null,
      interestRate: null,
      termMonths: null,
      approved: false,
      user: undefined
    };
  }
}
