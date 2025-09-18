import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UpcomingCourse {
  _id?: string;
  title: string;
  startDate: string;
  duration: string;
}

@Injectable({
  providedIn: 'root'
})
export class UpcomingCoursesService {
  private apiUrl = 'https://flow-hp2a.onrender.com/api/admin/upcoming-courses'; // check your backend route

  constructor(private http: HttpClient) {}

getAll(): Observable<UpcomingCourse[] | { courses: UpcomingCourse[] }> {
  return this.http.get<UpcomingCourse[] | { courses: UpcomingCourse[] }>(this.apiUrl);
}

add(course: UpcomingCourse): Observable<UpcomingCourse> {
  return this.http.post<UpcomingCourse>(this.apiUrl, course);
}

  update(id: string, course: UpcomingCourse): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, course);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
