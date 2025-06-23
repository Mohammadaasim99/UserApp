import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { Router } from '@angular/router';
import { DateUtil } from '../../../../core/utils/date.utils';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm = '';
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    public dateService: DateUtil
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    setTimeout(() => {
      this.users = this.userService.getUsers();
      this.filteredUsers = [...this.users];
      this.loading = false;
    }, 500);
  }

  filterUsers(): void {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.country.toLowerCase().includes(term)
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/users/create']);
  }

  navigateToUpdate(id: string): void {
    this.router.navigate(['/users/update', id]);
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id);
      this.loadUsers();
    }
  }
  clearSearch(): void {
    this.searchTerm = '';
    this.filterUsers();
  }
}