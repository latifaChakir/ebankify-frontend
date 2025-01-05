import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NavComponent} from "../../layouts/nav/nav.component";
import {NgForOf, NgIf} from "@angular/common";
import {SideComponent} from "../../layouts/side/side.component";
import {UserService} from "../../core/services/user/user.service";
import {User} from "../../core/models/user";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NavComponent,
    SideComponent,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user? : User;
  constructor(private userService: UserService) {
  }
ngOnInit() {
    this.loadUser();
}
  loadUser() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.userService.getUserById(+userId).subscribe(response => {
        this.user = response.user;
      }, error => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      });
    } else {
      console.warn("Aucun ID utilisateur trouvé dans le localStorage.");
    }
  }
}
