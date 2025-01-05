import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-no-authority',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './no-authority.component.html',
  styleUrl: './no-authority.component.css'
})
export class NoAuthorityComponent {

}
