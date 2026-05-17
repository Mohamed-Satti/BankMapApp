import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  // Model to hold the user's credentials
  credentials = {
    email: '',
    password: ''
  };

  // Property to display an error message to the user
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  /**
   * Handles the form submission for user login.
   * Calls the API service to authenticate the user and handles the response.
   */
  onLogin() {
    this.errorMessage = ''; // Clear any previous error messages

    this.apiService.login(this.credentials).subscribe({
      next: (response) => {
        // Log the response token and navigate to the map page on success
        console.log('Login successful!', response);
        localStorage.setItem('jwt', response.token);
        this.router.navigate(['/map']);
      },
      error: (err) => {
        // Display a user-friendly error message on failure
        console.error('Login failed', err);
        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    });
  }
}

