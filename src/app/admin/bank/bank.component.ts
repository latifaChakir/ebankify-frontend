import {Component, OnInit} from '@angular/core';
import {BankService} from "../../core/services/bank/bank.service";
import {Bank} from "../../core/models/bank";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavComponent} from "../../layouts/nav/nav.component";
import {NgForOf, NgIf} from "@angular/common";
import {SideComponent} from "../../layouts/side/side.component";

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [
    FormsModule,
    NavComponent,
    NgForOf,
    ReactiveFormsModule,
    SideComponent
  ],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css'
})
export class BankComponent implements OnInit{
  banks: Bank[] = [];
  loading: boolean = false;
  error: string | null = null;
  constructor(private bankService: BankService) {
  }
  ngOnInit() {
    this.loadBanks();
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

}
