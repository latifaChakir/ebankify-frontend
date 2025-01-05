import { Component } from '@angular/core';
import {NavComponent} from "../../layouts/nav/nav.component";
import {NgForOf} from "@angular/common";
import {SideComponent} from "../../layouts/side/side.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavComponent,
    NgForOf,
    SideComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
