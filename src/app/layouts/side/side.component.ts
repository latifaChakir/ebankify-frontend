import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../core/services/user/user.service";
import {AuthService} from "../../core/services/auth/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './side.component.html',
  styleUrl: './side.component.css'
})
export class SideComponent implements OnInit{
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.isAdmin = this.authService.getRole() === 'ADMIN';
  }

}
