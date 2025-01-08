import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../../layouts/nav/nav.component";
import {NgForOf} from "@angular/common";
import {SideComponent} from "../../layouts/side/side.component";
import {DashboardService} from "../../core/services/dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavComponent,
    SideComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  users : number = 0;
  employees : number = 0;
  administrators : number = 0;
  accounts : number = 0;
  banks : number = 0;
  constructor(private dashboardService: DashboardService) {
  }
  ngOnInit() {
    this.getStatistics();
  }
  getStatistics(): void {
    this.dashboardService.getAllStatistics().subscribe({
      next: (data) => {
        this.users = data.users;
        this.employees = data.employes;
        this.administrators = data.administrators;
        this.accounts = data.accounts;
        this.banks = data.banks;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des statistiques :", err);
      }
    });
  }
}
