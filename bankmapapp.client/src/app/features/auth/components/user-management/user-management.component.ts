import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [CommonModule]
})
export class UserManagementComponent {
  // Mock user data for demonstration
  users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Admin' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', role: 'User' },
  ];

  constructor() { }

  // Placeholder for the delete user functionality
  deleteUser(id: number) {
    // Implement API call to delete a user here
    console.log(`Deleting user with ID: ${id}`);
    this.users = this.users.filter(user => user.id !== id);
  }
}
