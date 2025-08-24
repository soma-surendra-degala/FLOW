import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Sidebar } from './Admin-components/sidebar/sidebar';
import { DashboardService } from '../shared/sharedservices/admin/dashboard';

import type { Student } from '../../app/shared/models/student.model';
import type { Ticket } from '../shared/models/ticket.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, Sidebar, HttpClientModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {
  isSidebarOpen = false;
  tickets: Ticket[] = [];
recentIssue: { studentName: string; subject: string; message: string; status: string } | null = null;


  stats = {
    courses: 0,
    practices: 0,
    students: 0,
    totalIssues: 0,
    openIssues: 0,
    inProgressIssues: 0,
    resolvedIssues: 0
  };

  recentActivity: string[] = [];
  recentStudents: Student[] = [];
  topStudents: Student[] = [];

  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentData();
    this.loadTickets();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  student(): void {
    this.router.navigate(['/admin/students']);
  }

  /** Load overall stats and recent activities */
  private loadStats(): void {
    this.dashboardService.getStudents().subscribe(students => {
      this.stats.students = students.length;
      this.topStudents = students.slice(-3).reverse();
      if (students.length > 0) {
        this.recentActivity.push(`🎓 New student registered: ${students[students.length - 1].name}`);
      }
    });

    this.dashboardService.getCourses().subscribe(courses => {
      this.stats.courses = courses.length;
      if (courses.length > 0) {
        this.recentActivity.push(`📘 New course added: ${courses[courses.length - 1].title}`);
      }
    });

    this.dashboardService.getPractices().subscribe(practices => {
      this.stats.practices = practices.length;
      if (practices.length > 0) {
        this.recentActivity.push(`📝 New practice added: ${practices[practices.length - 1].title}`);
      }
    });
  }

  /** Load recent students */
  private loadRecentData(): void {
    this.dashboardService.getStudents().subscribe(students => {
      this.recentStudents = students.slice(-3).reverse();
    });
  }

  /** Load tickets */
  private loadTickets(): void {
    this.dashboardService.getTickets().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets || [];
        this.calculateStats();
      },
      error: (err) => console.error('Error loading tickets', err)
    });
  }

  /** Calculate issue stats and least issue student */

private calculateStats(): void {
  this.stats.totalIssues = this.tickets.length;
  this.stats.openIssues = this.tickets.filter(t => t.status === 'open').length;
  this.stats.inProgressIssues = this.tickets.filter(t => t.status === 'in-progress').length;
  this.stats.resolvedIssues = this.tickets.filter(t => t.status === 'closed').length;

  // ✅ Get the latest ticket
  if (this.tickets.length > 0) {
    const latestTicket = this.tickets[this.tickets.length - 1];
    this.recentIssue = {
      studentName: latestTicket.studentId?.name || 'Unknown',
      subject: (latestTicket as any).subject || 'No subject',
      message: (latestTicket as any).message || 'No description',
      status: latestTicket.status || 'unknown'
    };
  } else {
    this.recentIssue = null;
  }
}



}
