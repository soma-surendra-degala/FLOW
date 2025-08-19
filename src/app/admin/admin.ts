import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import type { Student } from '../../app/shared/models/student.model';
import type { Course } from '../../app/shared/models/course.model';
import type { Practice } from '../../app/shared/models/practice.model';
import { CommonModule } from '@angular/common';
import { Sidebar } from './Admin-components/sidebar/sidebar';
import { DashboardService } from '../shared/sharedservices/dashboard';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, Sidebar,HttpClientModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {
  isSidebarOpen = false;

  stats = {
    courses: 0,
    practices: 0,
    students: 0
  };

  recentActivity: string[] = [];
  recentStudents: Student[] = [];
  topStudents: Student[] = [];

  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadStats();
    this.loadRecentData();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  student() {
    this.router.navigate(['/admin/students']);
  }

  private loadStats() {
    this.dashboardService.getStudents().subscribe(students => {
      this.stats.students = students.length;
      this.topStudents = students.slice(-3).reverse(); // last 3 students
      students.slice(-1).forEach(s => this.recentActivity.push(`🎓 New student registered: ${s.name}`));
    });

    this.dashboardService.getCourses().subscribe(courses => {
      this.stats.courses = courses.length;
      courses.slice(-1).forEach(c => this.recentActivity.push(`📘 New course added: ${c.title}`));
    });

    this.dashboardService.getPractices().subscribe(practices => {
      this.stats.practices = practices.length;
      practices.slice(-1).forEach(p => this.recentActivity.push(`📝 New practice added: ${p.title}`));
    });
  }

  private loadRecentData() {
    this.dashboardService.getStudents().subscribe(students => {
      this.recentStudents = students.slice(-3).reverse();
    });
  }
}
