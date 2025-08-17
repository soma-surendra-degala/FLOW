import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';



@Component({
  selector: 'app-dashboard',
  standalone: true, // 👈 important for standalone components
  imports: [CommonModule, Sidebar,Header],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  
  isSidebarOpen = false;

  constructor(private router: Router) {}

  // Sidebar toggle
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isDarkMode = false;

  ngOnInit() {
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }

  toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    this.isDarkMode = html.classList.contains('dark');
  }

  // Dashboard stats
  coursesEnrolled = 6;
  newCoursesThisWeek = 1;
  assignmentsDue = 4;
  nextAssignmentDeadline = '18 Aug';
  completedCourses = 3;

  // Recent activity
  recentActivities = [
    { description: 'Completed "Angular Basics"', time: '2h ago' },
    { description: 'Submitted Assignment #3 for Web Development', time: '6h ago' },
    { description: 'Joined "Advanced JavaScript"', time: 'Yesterday' },
  ];

}
