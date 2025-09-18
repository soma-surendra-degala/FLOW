import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../shared/sharedservices/students';
import { Student } from '../../../shared/components/models/student.model';
import { ToasterService } from '../../../shared/sharedservices/toaster';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true
})
export class Header implements OnInit {
  studentName: string = '';   // 👈 will come from backend
  isSidebarOpen: boolean = false;
  isDarkMode = true;

  constructor(private router: Router, private studentService: StudentService 
    , private toaster: ToasterService
  ) {
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

  ngOnInit(): void {
    this.loadStudentName();
  }

  loadStudentName() {
    this.studentService.getProfile().subscribe({
      next: (student: Student) => {
        this.studentName = student.name;   // 👈 set from backend
      },
      error: (err) => {
        console.error('Error loading student profile', err);
      }
    });
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  onLogout() {
    localStorage.removeItem('token'); // 👈 make sure same key used when login
    this.router.navigate(['/student/login']);
    this.toaster.show('👋 Logged out successfully', 'success');
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
