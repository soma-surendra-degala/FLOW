import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Practice {
  _id?: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  solution?: string;      // 🔑 added
  userAnswer?: string;    // optional, for student submissions
  status?: 'Pending' | 'Completed'; // optional, UI tracking

}

@Injectable({ providedIn: 'root' })
export class PracticeService {
  private apiUrl = 'http://localhost:5000/api/practices';

  constructor(private http: HttpClient) {}

  getPractices(): Observable<Practice[]> {
    return this.http.get<Practice[]>(this.apiUrl);
  }

  getPractice(id: string): Observable<Practice> {
    return this.http.get<Practice>(`${this.apiUrl}/${id}`);
  }

  addPractice(practice: Practice): Observable<Practice> {
    return this.http.post<Practice>(this.apiUrl, practice);
  }

  updatePractice(id: string, practice: Practice): Observable<Practice> {
    return this.http.put<Practice>(`${this.apiUrl}/${id}`, practice);
  }

  deletePractice(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
