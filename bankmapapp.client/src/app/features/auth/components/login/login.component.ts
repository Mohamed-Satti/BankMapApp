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







//--------------1111111111111111111111111111--------------------------------
//import { Component } from '@angular/core';
//import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Router } from '@angular/router';
//import { AuthService } from '../auth.service';

//// Angular Material imports
//import { MatCardModule } from '@angular/material/card';
//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatInputModule } from '@angular/material/input';
//import { MatButtonModule } from '@angular/material/button';
//import { HttpClientModule } from '@angular/common/http';

//@Component({
//  selector: 'app-login',
//  standalone: true,
//  imports: [
//    ReactiveFormsModule,
//    MatCardModule,
//    MatFormFieldModule,
//    MatInputModule,
//    MatButtonModule,
//    HttpClientModule
//  ],
//  templateUrl: './login.component.html',
//  styleUrls: ['./login.component.css']
//})
//export class LoginComponent {
//  loginForm: FormGroup;

//  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
//    this.loginForm = this.fb.group({
//      username: ['', Validators.required],
//      password: ['', Validators.required]
//    });
//  }

//  onSubmit() {
//    if (this.loginForm.valid) {
//      this.auth.login(this.loginForm.value).subscribe({
//        next: (res) => {
//          this.auth.saveToken(res.token);
//          this.router.navigate(['/dashboard']);//CHECK THIS ROUTE
//        },
//        error: (err) => {
//          console.error('Login failed', err);
//        }
//      });
//    }
//  }
//}
//--------------1111111111111111111111111111--------------------------------


////////////////////////////////////////////////////////
//FUNCTIONING PROPERLY BUT WITHOUT POST REQUESTS
//import { Component } from '@angular/core';
//import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
//// Angular Material imports
//import { MatCardModule } from '@angular/material/card';
//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatInputModule } from '@angular/material/input';
//import { MatButtonModule } from '@angular/material/button';

//@Component({
//  selector: 'app-login',
//  standalone: true,
//  imports: [
//    ReactiveFormsModule,
//    MatCardModule,
//    MatFormFieldModule,
//    MatInputModule,
//    MatButtonModule
//  ],
//  templateUrl: './login.component.html',
//  styleUrls: ['./login.component.css']
//})
//export class LoginComponent {
//  loginForm: FormGroup;

//  constructor(private fb: FormBuilder) {
//    this.loginForm = this.fb.group({
//      username: ['', Validators.required],
//      password: ['', Validators.required]
//    });
//  }

//  onSubmit() {
//    if (this.loginForm.valid) {
//      console.log('Login:', this.loginForm.value);
//    }
//  }
//}


/////////////////////////////////

//import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { AppRoutingModule } from '../app-routing.module';
//import { ReactiveFormsModule } from '@angular/forms';


//@Component({
//  selector: 'app-login',
//  standalone: true,
//  templateUrl: './login.component.html',
//  styleUrls: ['./login.component.css'],
//  imports: [ReactiveFormsModule] 
//})

////@Component({
////  selector: 'app-login',
////  standalone: false,
////  templateUrl: './login.component.html',
////  styleUrls: ['./login.component.css']
////})
//export class LoginComponent implements OnInit {
//  loginForm: FormGroup;

//  constructor(private formBuilder: FormBuilder) {
//    this.loginForm = this.formBuilder.group({
//      username: ['', Validators.required],
//      password: ['', Validators.required]
//    });
//  }

//  ngOnInit(): void {
//    throw new Error('Method not implemented.');
//  }

//  onSubmit(): void {
//    if (this.loginForm.valid) {
//      console.log('Login Form Submitted!', this.loginForm.value);
//    } else {
//      return;
//    }
//  }
//}


///////////////////////////////
////import { Component } from '@angular/core';
////import { Router, RouterModule } from '@angular/router';
////import { AuthService } from '../services/auth.service';
////import { LoginRequest } from '../models/login-request.model';
////import { FormsModule } from '@angular/forms';
////import { NgModule } from '@angular/core';


////@Component({
////  selector: 'app-login',
////  standalone: true,
////  imports: [RouterModule],
////  templateUrl: './login.component.html',
////  styleUrls: ['./login.component.css']
////})
////export class LoginComponent {
////  request: LoginRequest = { username: '', password: '' };
////  errorMessage = '';
  
////  constructor(private authService: AuthService, private router: Router) { }

////  onSubmit() {
////    this.authService.login(this.request).subscribe({
////      next: (res) => {
////        this.authService.saveToken(res.token);
////        this.router.navigate(['/pois']);
////      },
////      error: () => {
////        this.errorMessage = 'Invalid username or password';
////      }
////    });
////  }
////}

//////////////////////////////////////

//////import { Component } from '@angular/core';
//////import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//////@Component({
//////  selector: 'app-login',
//////  templateUrl: './login.component.html',
//////  styleUrls: ['./login.component.css']
//////})
//////export class LoginComponent {
//////  loginForm: FormGroup;
//////  isSubmitted = false;
//////  errorMessage: string | null = null;

//////  constructor(private fb: FormBuilder) {
//////    this.loginForm = this.fb.group({
//////      username: ['', Validators.required],
//////      password: ['', Validators.required]
//////    });
//////  }

//////  onSubmit(): void {
//////    this.isSubmitted = true;
//////    if (this.loginForm.valid) {
//////      // TODO: Implement authentication logic here
//////      this.errorMessage = null;
//////      // Example: Call authentication service
//////    } else {
//////      this.errorMessage = 'Please enter valid credentials.';
//////    }
//////  }
//////}
