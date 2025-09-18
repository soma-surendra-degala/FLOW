import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Student } from '../components/models/student.model'; 
import { Course } from '../components/models/course.model';
import { Practice } from '../components/models/practice.model';
import type { UpcomingCourse } from '../components/models/upcoming-course.model';
import { Ticket } from '../components/models/ticket.model';


export interface Stats {
  totalCourses: number;
  totalPractices: number;
  totalStudents: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private baseUrl = 'https://flow-hp2a.onrender.com/api/admin'; // ✅ Correct

constructor(private http: HttpClient) {}
getStudents() {
  return this.http.get<Student[]>('https://flow-hp2a.onrender.com/api/students'); // remove /admin
}

getCourses() {
  return this.http.get<Course[]>('https://flow-hp2a.onrender.com/api/courses');
}

getPractices() {
  return this.http.get<Practice[]>('https://flow-hp2a.onrender.com/api/practices');
}

 getUpcomingCourses(): Observable<UpcomingCourse[]> {
    return this.http.get<UpcomingCourse[]>(`${this.baseUrl}/upcoming-courses`);
  }

  getTickets() {
  const token = localStorage.getItem('studentToken');
  return this.http.get<Ticket[]>('https://flow-hp2a.onrender.com/api/support', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}



}

