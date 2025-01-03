import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  showModal: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  selectedUser: User = {
    name: '',
    email: '',
    age: null,
    password: '',
    roles: [],
    active: true,
    creditScore: null,
    monthlyIncome: null
  };

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
      }
    );
  }

  saveUser(user: User): void {
    if (this.selectedUser.id) {
      this.userService.updateUser(this.selectedUser.id, user).subscribe(() => {
        this.loadUsers();
        this.closeModal();
      });
    } else {
      this.userService.createUser(user).subscribe(() => {
        this.loadUsers();
        this.closeModal();
      });
    }
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.openModal();
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUser = {
      name: '',
      email: '',
      age: null,
      password: '',
      roles: [],
      active: true,
      creditScore: null,
      monthlyIncome: null
    };
  }
}
