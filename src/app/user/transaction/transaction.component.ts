import { Component } from '@angular/core';
import {NavComponent} from "../../layouts/nav/nav.component";
import {SideComponent} from "../../layouts/side/side.component";

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    NavComponent,
    SideComponent
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

}
