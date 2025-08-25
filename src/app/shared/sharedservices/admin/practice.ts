import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Practice {
  _id?: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  solution?: string;
  userAnswer?: string;
  status?: 'Pending' | 'Completed';
  categories?: string[]; // ✅ added
}

@Injectable({ providedIn: 'root' })
export class PracticeService {
  private apiUrl = 'http://localhost:5000/api/practices';

  constructor(private http: HttpClient) {}

  getPractices(categories?: string[]): Observable<Practice[]> {
  let params = new HttpParams();
  if (categories && categories.length > 0) {
    params = params.set('categories', categories.join(',')); // ✅ Comma-separated list
  }
  return this.http.get<Practice[]>(this.apiUrl, { params });
}
getUserSolutions() {
  return this.http.get<{ [key: string]: string }>('api/user/solutions');
}

submitSolution(practiceId: string, payload: { userId: string; solutionText: string }) {
  return this.http.post(`http://localhost:5000/api/practices/${practiceId}/submit`, payload);
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
