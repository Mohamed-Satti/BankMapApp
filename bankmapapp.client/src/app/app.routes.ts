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


//-------111111111111--------------
//import { Routes } from '@angular/router';
//import { LoginComponent } from './features/auth/components/login/login.component';
//import { MapComponent } from './features/map/map.component';
//import { DashboardComponent } from './dashboard/dashboard.component'; // Uncomment when you have a dashboard component
//import { AuthGuard } from './core/guards/auth.guard';

//export const routes: Routes = [
//  { path: '', redirectTo: 'login', pathMatch: 'full' },
//  { path: 'login', component: LoginComponent },
//  { path: 'map', component: MapComponent }, //ONLY for testing purposes
//  // Uncomment the next line to enable the dashboard route
//  { path: 'dashboard', component: DashboardComponent /*, canActivate: [AuthGuard]*/ },
//  //{ path: '**', redirectTo: 'login' }
//];
//-------111111111111--------------


//FULL VERSION
//import { Routes } from '@angular/router';
//import { LoginComponent } from './auth/login/login.component';
//import { MapComponent } from '../features/map/map.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
//import { AuthGuard } from './core/guards/auth.guard';
//import { AdminComponent } from './features/admin/admin.component';
//import { PoiComponent } from './features/poi/poi.component';
//import { UserComponent } from './features/user/user.component';

//export const routes: Routes = [
//  { path: '', redirectTo: 'login', pathMatch: 'full' },
//  { path: 'login', component: LoginComponent },
//  { path: 'map', component: MapComponent },
//  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
//  { path: 'poi', component: PoiComponent, canActivate: [AuthGuard] },
//  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
//  { path: '**', redirectTo: 'login' }
//];



