import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class CareersService {
  private apiUrl = 'http://localhost:5000/api/careers';

  constructor(private http: HttpClient) {}

  getCareers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addJob(job: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, job);
  }

  updateJob(id: string, job: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, job);
}


  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
