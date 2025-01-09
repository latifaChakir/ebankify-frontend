import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../../layouts/nav/nav.component";
import {SideComponent} from "../../layouts/side/side.component";
import {InvoiceService} from "../../core/services/invoice/invoice.service";
import {UserService} from "../../core/services/user/user.service";
import {Invoice, InvoiceStatus} from "../../core/models/invoice";
import {User} from "../../core/models/user";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    NavComponent,
    SideComponent,
    NgForOf,
    NgClass,
    FormsModule,
    NgIf
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{
  invoices: Invoice[] = [];
  users: User[] = [];
  loading: boolean = false;
  error: string | null = null;
  showModal: boolean = false;
  constructor(private invoiceService: InvoiceService,
              private userService: UserService) {
  }
  ngOnInit() {
    this.loadInvoices();
    this.loadUsers();
  }
  selectedInvoice: Invoice = {
    amountDue: null,
    dueDate: '',
    status: InvoiceStatus.UNPAID,
    user: undefined
  };
  loadInvoices(): void {
    this.loading = true;
    this.invoiceService.getAllInvoices().subscribe(
      (invoices) => {
        this.invoices = invoices;
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors du chargement des factures';
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

  saveInvoice(invoice: Invoice): void {
    const payload = {
      ...invoice,
      userId : invoice.user?.id
    };
    if (this.selectedInvoice.id) {
      this.invoiceService.updateInvoice(this.selectedInvoice.id, payload).subscribe(() => {
        this.loadInvoices();
        this.closeModal();
      });
    } else {
      this.invoiceService.createInvoice(payload).subscribe(() => {
        this.loadInvoices();
        this.closeModal();
      });
    }
  }

  editInvoice(invoice: Invoice): void {
    this.selectedInvoice = { ...invoice ,
      user: this.users.find(user => user.id === invoice.user?.id),
    };
    this.openModal();
  }

  deleteInvoice(invoiceId: number): void {
    this.invoiceService.deleteInvoice(invoiceId).subscribe(() => {
      this.loadInvoices();
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetSelectedInvoice();
  }

  resetSelectedInvoice(): void {
    this.selectedInvoice = {
      amountDue: 0,
      dueDate: '',
      status: InvoiceStatus.UNPAID,
      user: undefined
    };
  }

}
