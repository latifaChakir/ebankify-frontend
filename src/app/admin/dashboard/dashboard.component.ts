import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";
import { NavComponent } from "../../layouts/nav/nav.component";
import { SideComponent } from "../../layouts/side/side.component";
import { DashboardService } from "../../core/services/dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BaseChartDirective,
    NavComponent,
    SideComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: number = 0;
  employees: number = 0;
  administrators: number = 0;
  accounts: number = 0;
  banks: number = 0;

  // Doughnut Chart
  public doughnutChartLabels: string[] = ['Users', 'Employees', 'Accounts', 'Banks'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [150, 80, 120, 40] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // Line Chart
  public lineChartLabels: string[] = ['Users', 'Employees', 'Accounts', 'Banks'];
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [
      {
        label: 'Statistics',
        data: [150, 80, 120, 40],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.4,
      }
    ]
  };
  public lineChartType: ChartType = 'line';

  constructor(private dashboardService: DashboardService) {}

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

        this.doughnutChartData = {
          labels: this.doughnutChartLabels,
          datasets: [
            { data: [this.users, this.employees, this.accounts, this.banks] }
          ]
        };

        this.lineChartData = {
          labels: this.lineChartLabels,
          datasets: [
            {
              label: 'Statistics',
              data: [this.users, this.employees, this.accounts, this.banks], // Données dynamiques
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
              tension: 0.4,
            }
          ]
        };
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des statistiques :", err);
      }
    });
  }
}
