// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from '../../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/students'; // adjust API URL

  constructor(private http: HttpClient) {}

  // Helper to get headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  }

  getProfile(): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/profile`, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }

updateProfile(data: FormData) {
  const token = localStorage.getItem('token');
  return this.http.put<Student>(`${this.apiUrl}/profile`, data, {
    headers: { Authorization: `Bearer ${token}` } // DO NOT set Content-Type manually
  });
}



  // Admin: get all students
  getStudents(): Observable<Student[]> {
    return this.http
      .get<Student[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(catchError((err) => throwError(() => err)));
  }

  // Admin: update a student by ID
  updateStudent(id: string, data: Partial<Student>): Observable<Student> {
    return this.http
      .put<Student>(`${this.apiUrl}/${id}`, data, { headers: this.getAuthHeaders() })
      .pipe(catchError((err) => throwError(() => err)));
  }
}
