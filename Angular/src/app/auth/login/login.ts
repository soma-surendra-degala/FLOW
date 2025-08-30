
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, LoginData } from '../services/auth';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginData: LoginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

onLogin() {
  this.authService.login(this.loginData).subscribe({
    next: (res: { token: string; student: any }) => {
      // Save JWT token
      localStorage.setItem('token', res.token);
      this.router.navigate(['/student/dashboard']);
    },
    error: (err: any) => {
      console.error('Login error:', err);
      alert(err.error?.message || 'Login failed');
    }
  });
}

   register() {
    this.router.navigate(['/student/register']); // redirect to register page
  }
}

 