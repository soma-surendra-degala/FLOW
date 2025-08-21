import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';
import { DashboardService } from '../../shared/sharedservices/admin/dashboard';
import type { Student } from '../../shared/models/student.model';
import type { Course } from '../../shared/models/course.model';
import type { Practice } from '../../shared/models/practice.model';
import type { UpcomingCourse } from '../../shared/models/upcoming-course.model';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface Activity {
  type: 'submission' | 'enrollment' | 'completion';
  text: string;
  course: string;
  timeAgo: string;
}

interface SummaryCard {
  title: string;
  value: string | number;
  icon: string;
  color: string; // Tailwind color class
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Sidebar, Header ,HttpClientModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  isSidebarOpen = false;
  isDarkMode = false;

  summaryCards: SummaryCard[] = [];
  recentActivities: Activity[] = [];

  students: Student[] = [];
  courses: Course[] = [];
  practices: Practice[] = [];
  upcomingCourses: UpcomingCourse[] = [];

  constructor(private dashboardService: DashboardService , private router:Router) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadActivities();
     this.loadUpcomingCourses();
  }

  // Sidebar toggle
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Dark mode toggle
  toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    this.isDarkMode = html.classList.contains('dark');
  }

  // ✅ Load Stats
  private loadStats() {
    this.dashboardService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.updateSummaryCards();
    });

    this.dashboardService.getStudents().subscribe(students => {
      this.students = students;
      this.updateSummaryCards();
    });

    this.dashboardService.getPractices().subscribe(practices => {
      this.practices = practices;
      this.updateSummaryCards();
    });
  }

  // ✅ Load Recent Activities
  private loadActivities() {
    this.dashboardService.getStudents().subscribe(students => {
      if (students.length > 0) {
        const latest = students[students.length - 1];
        this.recentActivities.push({
          type: 'enrollment',
          text: 'New Student Enrolled',
          course: '',
          timeAgo: 'Just now'
        });
      }
    });

    this.dashboardService.getCourses().subscribe(courses => {
      if (courses.length > 0) {
        const latest = courses[courses.length - 1];
        this.recentActivities.push({
          type: 'completion',
          text: 'New Course Added',
          course: latest.title,
          timeAgo: 'Recently'
        });
      }
    });

    this.dashboardService.getPractices().subscribe(practices => {
      if (practices.length > 0) {
        const latest = practices[practices.length - 1];
        this.recentActivities.push({
          type: 'submission',
          text: 'New Practice Uploaded',
          course: latest.title,
          timeAgo: 'Today'
        });
      }
    });
  }

  // ✅ Update Summary Cards dynamically
  private updateSummaryCards() {
    this.summaryCards = [
      { title: 'Courses', value: this.courses.length, icon: 'bi-book', color: 'cyan-400' },
      { title: 'Students', value: this.students.length, icon: 'bi-people', color: 'green-400' },
      { title: 'Practices', value: this.practices.length, icon: 'bi-pencil-square', color: 'yellow-400' },
    ];
  }

  // ✅ Helper to get icon color based on type
  getActivityColor(type: string): string {
    switch (type) {
      case 'submission': return 'text-green-400';
      case 'enrollment': return 'text-cyan-400';
      case 'completion': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  }
private loadUpcomingCourses() {
  this.dashboardService.getUpcomingCourses().subscribe(courses => {
    console.log("Upcoming courses from API:", courses); // ✅ Debug
    this.upcomingCourses = courses;
  });
}

}
