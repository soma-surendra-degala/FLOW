import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private router: Router) {}

  // ✅ Login (store token)
  login(email: string, password: string): boolean {
    // Fake login (replace with API call in real app)
    if (email === 'test' && password === '1234') {
      localStorage.setItem(this.tokenKey, 'sample-jwt-token');
      return true;
    }
    return false;
  }

  // ✅ Logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/student/login']);
  }

  // ✅ Check if logged in
  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem(this.tokenKey);
  // }

  isAuthenticated(): boolean {
  const token = localStorage.getItem(this.tokenKey);
  console.log('🔑 isAuthenticated check, token =', token);
  return !!token;
}


  // ✅ Get Token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
