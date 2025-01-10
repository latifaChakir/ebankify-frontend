import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserManagementComponent } from './user-management.component';
import { UserService } from '../../core/services/user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../../core/models/user';
import { SideComponent } from "../../layouts/side/side.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from "@angular/router"; // Import this

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let userServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      getAllUsers: jasmine.createSpy('getAllUsers').and.returnValue(of([])), // Default return value to avoid undefined
      createUser: jasmine.createSpy('createUser'),
      updateUser: jasmine.createSpy('updateUser'),
      deleteUser: jasmine.createSpy('deleteUser'),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SideComponent],
      declarations: [UserManagementComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: { params: {} }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on initialization', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
        password: 'password',
        roles: [{ id: 1, name: 'User' }],
        active: true,
        creditScore: 700,
        monthlyIncome: 3000
      },
    ];
    userServiceMock.getAllUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(userServiceMock.getAllUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should handle error during user loading', () => {
    userServiceMock.getAllUsers.and.returnValue(throwError('Error'));

    component.loadUsers();

    expect(userServiceMock.getAllUsers).toHaveBeenCalled();
    expect(component.error).toBe('Erreur lors du chargement des utilisateurs');
    expect(component.loading).toBe(false);
  });

  it('should create a new user', () => {
    const newUser: User = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      age: 28,
      password: 'password',
      roles: [{ id: 1, name: 'User' }],
      active: true,
      creditScore: 680,
      monthlyIncome: 4000
    };
    userServiceMock.createUser.and.returnValue(of(newUser));

    component.saveUser(newUser);

    expect(userServiceMock.createUser).toHaveBeenCalledWith(newUser);
  });

  it('should update an existing user', () => {
    const existingUser: User = {
      id: 1,
      name: 'Updated Name',
      email: 'updated@example.com',
      age: 29,
      password: 'password',
      roles: [{ id: 1, name: 'User' }],
      active: true,
      creditScore: 710,
      monthlyIncome: 3500
    };
    component.selectedUser = {
      id: 1,
      name: 'Initial Name',
      email: 'initial@example.com',
      age: 30,
      password: 'password',
      roles: [{ id: 1, name: 'User' }],
      active: true,
      creditScore: 700,
      monthlyIncome: 3000
    };
    userServiceMock.updateUser.and.returnValue(of(existingUser));

    component.saveUser(existingUser);

    expect(userServiceMock.updateUser).toHaveBeenCalledWith(1, existingUser);
  });

  it('should delete a user', () => {
    const userId = 1;
    userServiceMock.deleteUser.and.returnValue(of({}));

    component.deleteUser(userId);

    expect(userServiceMock.deleteUser).toHaveBeenCalledWith(userId);
  });

  it('should open and close the modal', () => {
    component.openModal();
    expect(component.showModal).toBeTrue();

    component.closeModal();
    expect(component.showModal).toBeFalse();
  });
});
