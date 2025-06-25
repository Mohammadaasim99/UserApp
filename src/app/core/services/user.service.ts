import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'users';

  constructor() { }

  getUsers(): User[] {
    const usersJson = localStorage.getItem(this.STORAGE_KEY);
    try {
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (e) {
      console.error('Failed to parse users from localStorage', e);
      return [];
    }
  }

  getUserById(id: string): User | undefined {
    return this.getUsers().find(user => user.id === id);
  }

  createUser(user: User): void {
    const users = this.getUsers();
    user.id = this.generateId();
    user.createdAt = new Date().toISOString();
    users.push(user);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  updateUser(updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }
  }

  deleteUser(id: string): void {
    const users = this.getUsers().filter(user => user.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  private generateId(): string {
    // Simple UUID v4 generator
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}