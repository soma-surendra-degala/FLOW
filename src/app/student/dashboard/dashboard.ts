import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard {
  studentName = 'Aryan';

  constructor(private router: Router) {
  }

  // Data for dashboard cards
  coursesEnrolled = 6;
  newCoursesThisWeek = 1;
  assignmentsDue = 4;
  nextAssignmentDeadline = '18 Aug';
  completedCourses = 3;

  // Recent activity list
  recentActivities = [
    { description: 'Completed "Angular Basics"', time: '2h ago' },
    { description: 'Submitted Assignment #3 for Web Development', time: '6h ago' },
    { description: 'Joined "Advanced JavaScript"', time: 'Yesterday' },
  ];

  onLogout() {
    this.router.navigate(['/student/login']);
  }
  dashboard() {
    this.router.navigate(['/student/dashboard']);
  }
  courses() {
    this.router.navigate(['/student/courses']);
  }
}
