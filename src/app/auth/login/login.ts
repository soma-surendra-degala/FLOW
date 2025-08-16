import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

 export class Login {
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const success = this.authService.login(
      this.loginData.email,
      this.loginData.password
    );

    if (success) {
      this.router.navigate(['/student/dashboard']); // redirect after login
    } else {
      alert('Invalid email or password');
    }
  }
  register() {
    this.router.navigate(['/student/register']); // redirect to register page
  }
 }
