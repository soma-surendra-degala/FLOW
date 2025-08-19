import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Student } from '../models/student.model'; 
import { Course } from '../models/course.model';
import { Practice } from '../models/practice.model';


export interface Stats {
  totalCourses: number;
  totalPractices: number;
  totalStudents: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private baseUrl = 'http://localhost:5000/api/admin'; // ✅ Correct

constructor(private http: HttpClient) {}
getStudents() {
  return this.http.get<Student[]>('http://localhost:5000/api/students'); // remove /admin
}

getCourses() {
  return this.http.get<Course[]>('http://localhost:5000/api/courses');
}

getPractices() {
  return this.http.get<Practice[]>('http://localhost:5000/api/practices');
}

}

