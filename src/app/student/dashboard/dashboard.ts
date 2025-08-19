import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';

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
  color: string; // Tailwind color
}


@Component({
  selector: 'app-dashboard',
  standalone: true, // 👈 important for standalone components
  imports: [CommonModule, Sidebar,Header],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  
  isSidebarOpen = false;


  // Sidebar toggle
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isDarkMode = false;

  toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    this.isDarkMode = html.classList.contains('dark');
  }

sidebar: any; // optional, for reference to sidebar if needed

  summaryCards: SummaryCard[] = [];
  recentActivities: Activity[] = [];

  constructor() {}

  ngOnInit(): void {
    // Sample summary data
    this.summaryCards = [
      { title: 'Courses', value: 5, icon: 'bi-book', color: 'cyan-400' },
      { title: 'Completed', value: 8, icon: 'bi-check-circle', color: 'green-400' },
      { title: 'Progress', value: '78%', icon: 'bi-graph-up-arrow', color: 'green-400' },
      { title: 'Upcoming', value: 3, icon: 'bi-clock-history', color: 'yellow-400' },
    ];

    // Sample recent activities
    this.recentActivities = [
      { type: 'submission', text: 'Submitted Assignment 3', course: 'Math', timeAgo: '2h ago' },
      { type: 'enrollment', text: 'Enrolled in', course: 'Web Development', timeAgo: '1d ago' },
      { type: 'completion', text: 'Completed', course: 'Python Basics', timeAgo: '3d ago' },
    ];
  }

  // Helper to get icon color based on type
  getActivityColor(type: string): string {
    switch (type) {
      case 'submission': return 'text-green-400';
      case 'enrollment': return 'text-cyan-400';
      case 'completion': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  }

}
