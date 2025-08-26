import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private tokenKey = 'adminToken';

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === 'admin@test.com' && password === '12345678') {
      localStorage.setItem(this.tokenKey, 'sample-admin-jwt-token');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/admin/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
