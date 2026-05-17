import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { MapComponent } from './features/map/map.component';
import { UserManagementComponent } from './features/auth/components/user-management/user-management.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // Default route redirects to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public routes
  { path: 'login', component: LoginComponent },

  // Protected routes (require login)
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },

  // Admin-only routes (require admin role)
  { path: 'admin/users', component: UserManagementComponent, canActivate: [AuthGuard, AdminGuard] },
];



