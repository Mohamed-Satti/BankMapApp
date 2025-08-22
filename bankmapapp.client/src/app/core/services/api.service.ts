import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Base URL for the backend API, a placeholder for the proxy
  private readonly baseUrl = 'https://localhost:7191/api';

  constructor(private http: HttpClient) { }

  /**
   * Generates HTTP headers with the JWT token for authenticated requests.
   * NOTE: This is a temporary solution for demonstration. The AuthInterceptor
   * will handle this automatically once it is fully implemented.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  /**
   * Authenticates a user with the backend.
   * @param credentials An object containing the user's email and password.
   * @returns An observable with the login response (which should contain the JWT token).
   */
  login(credentials: any): Observable<any> {
    // The path 'auth/login' is an endpoint on your backend
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }


  getPois(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Pois`);
  }

  createPoi(poiData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    // The path 'poi' is an endpoint on your backend
    return this.http.post(`${this.baseUrl}/Pois`, poiData, { headers });
  }

  updatePoi(poiId: string, poiData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    // The path 'poi' is an endpoint on your backend
    return this.http.put(`${this.baseUrl}/Pois/${poiId}`, poiData, { headers });
  }

  deletePoi(poiId: any): Observable<any> {
    //const headers = this.getAuthHeaders();
    // The path 'poi' is an endpoint on your backend
    return this.http.delete<void>(`${this.baseUrl}/Pois/${poiId}`);
  }

}
