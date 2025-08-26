import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/students';
  private tokenKey = 'studentToken';

  constructor(private http: HttpClient) {}

  // ✅ Register
  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // ✅ Login
  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        if (res.token) localStorage.setItem(this.tokenKey, res.token);
      })
    );
  }

  // ✅ Logout
  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  // ✅ Check authentication
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // ✅ Get token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
