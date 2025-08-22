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


//-----11111111--------
//import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';

//@Injectable({
//  providedIn: 'root'
//})
//export class AuthService {
//  private apiUrl = 'https://localhost:5069/api/auth'; // Check port no.

//  constructor(private http: HttpClient) { }

//  login(credentials: { username: string; password: string }): Observable<any> {
//    return this.http.post(`${this.apiUrl}/login`, credentials);
//  }

//  saveToken(token: string) {
//    localStorage.setItem('token', token);
//  }

//  getToken(): string | null {
//    return localStorage.getItem('token');
//  }

//  getUserRole(): string {//Added recently
//    const token = localStorage.getItem('token');
//    if (token) {
//      const payload = JSON.parse(atob(token.split('.')[1]));
//      return payload.role; // Assuming you put 'role' in JWT
//    }
//    return '';
//  }

//  logout() {
//    localStorage.removeItem('token');
//  }

//  isLoggedIn(): boolean {
//    return !!this.getToken();
//  }
//}
//--------11111111----------

//////////////////
//WAS FUNCTIONING PROPERLY using login-request.model.ts
//import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import { LoginRequest, LoginResponse } from '../models/login-request.model';


//export interface AuthResponse {
//  token: string;
//  user: {
//    id: string;
//    username: string;
//    email: string;
//  };
//}

//@Injectable({
//  providedIn: 'root'
//})
//export class AuthService {
//  private apiUrl = '/api/Auth'; // Will use Angular proxy

//  constructor(private http: HttpClient) { }

//  login(request: LoginRequest): Observable<LoginResponse> {
//    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request);
//  }

//  saveToken(token: string) {
//    localStorage.setItem('jwtToken', token);
//  }

//  getToken(): string | null {
//    return localStorage.getItem('jwtToken');
//  }

//  logout() {
//    localStorage.removeItem('jwtToken');
//  }
//}
