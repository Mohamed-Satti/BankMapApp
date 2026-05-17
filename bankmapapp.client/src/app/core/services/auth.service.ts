import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  /**
   * Checks if the user is currently logged in by looking for a JWT in local storage.
   * @returns A boolean indicating the login status.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  /**
   * Checks if the authenticated user is an administrator.
   * NOTE: In a real application, you would decode the JWT to check the user's role.
   * For this project, we'll assume a specific token or a simplified check.
   * @returns An observable of a boolean indicating if the user is an admin.
   */
  isAdmin(): Observable<boolean> {
    // This is a simplified check. In a real scenario, you would decode the token
    // to find the user's role. For now, we'll return true to allow access.
    // Replace this logic with your actual role check.
    const token = localStorage.getItem('jwt');
    const isAdmin = token === 'admin-token'; // Replace with a real check
    return of(isAdmin);
  }

  /**
   * Logs out the user by removing the JWT token and navigating to the login page.
   */
  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
