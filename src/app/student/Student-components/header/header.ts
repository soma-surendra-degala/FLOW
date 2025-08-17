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

   @Output() toggleSidebar = new EventEmitter<void>();

  studentName = 'Suri';
  isSidebarOpen: boolean = false;
closeSidebar() {
  this.isSidebarOpen = false;
}
  constructor(private router :Router) {}

  onLogout() {
    localStorage.removeItem('authToken'); // optional
    this.router.navigate(['/student/login']);
  }
  isDarkMode = true; // default dark mode

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDarkMode = false;
      document.documentElement.classList.remove('dark');
    } else {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  }


}
