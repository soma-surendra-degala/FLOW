import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, LoginData } from '../services/auth';
import { ToasterService } from '../../shared/sharedservices/toaster';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginData: LoginData = { email: '', password: '' };
  loading = false; // Loader flag

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToasterService
  ) {}

  onLogin() {
    if (this.loading) return; // prevent multiple clicks
    this.loading = true;

    this.authService.login(this.loginData).subscribe({
      next: (res: { token: string; student: any }) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/student/dashboard']);
        this.toaster.show('Login successful!', 'success');
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.toaster.show(err.error?.message || 'Login failed', 'error');
        this.loading = false;
      }
    });
  }

  register() {
    this.router.navigate(['/student/register']);
  }
}
