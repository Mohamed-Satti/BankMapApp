import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Checks if a user is an administrator before allowing them to access a route.
   * @returns A boolean observable indicating if the user is an admin.
   */
  canActivate(): Observable<boolean> {
    return this.authService.isAdmin().pipe(
      map(isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          // If not an admin, navigate to an unauthorized page or dashboard
          this.router.navigate(['/map']);
          return false;
        }
      })
    );
  }
}
