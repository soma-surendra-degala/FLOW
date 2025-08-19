import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  studentName = 'Suri';
  isSidebarOpen: boolean = false;
  isDarkMode = true; // default dark

  constructor(private router: Router) {
    // ✅ Load saved theme on page reload
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDarkMode = false;
      document.documentElement.classList.remove('dark');
    } else {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  }

  @Output() toggleSidebar = new EventEmitter<void>();

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  onLogout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/student/login']);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    const htmlEl = document.documentElement;
    if (this.isDarkMode) {
      htmlEl.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlEl.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
