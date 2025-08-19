import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './admin-components/sidebar/sidebar';
import { Router } from '@angular/router';

// Define student type
interface Student {
  name: string;
  score: number;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {
  isSidebarOpen = false;

  stats = {
    courses: 12,
    practice: 45,
    students: 230,
    revenue: 120000,
    activeCourses: 8,
  };

  recentActivity: string[] = [
    '🎓 New student registered',
    '📘 Course "Angular Basics" updated',
    '📝 Practice set "Arrays" completed by 10 students',
    '💰 Revenue report generated',
  ];

  courseProgress = [
    { title: 'Angular Basics', progress: 80 },
    { title: 'React Fundamentals', progress: 60 },
    { title: 'Python for ML', progress: 45 },
  ];

  // ✅ Strongly typed students
  topStudents: Student[] = [
    { name: 'Ravi Kumar', score: 95, status: 'Active' },
    { name: 'Ananya Sharma', score: 90, status: 'Active' },
    { name: 'Rahul Mehta', score: 88, status: 'Inactive' },
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  constructor(private router: Router) {}
  student() {
    this.router.navigate(['/admin/students']);
  }
}
