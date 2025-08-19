import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private tokenKey = 'adminToken';

  constructor(private router: Router) {}

  // Admin Login (fake)
  login(email: string, password: string): boolean {
    if (email === 'admin@gmail.com' && password === '12345678') {
      localStorage.setItem(this.tokenKey, 'sample-admin-jwt-token');
      return true;
    }
    return false;
  }

  // Admin Logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/admin/login']);
  }

  // Check if Admin is logged in
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    console.log('👑 Admin isAuthenticated check, token =', token);
    return !!token;
  }

  // Get Admin Token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
