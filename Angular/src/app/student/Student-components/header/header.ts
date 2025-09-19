import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../shared/sharedservices/students';
import { Student } from '../../../shared/components/models/student.model';
import { ToasterService } from '../../../shared/sharedservices/toaster';
import { NotificationService, AppNotification } from '../../../shared/sharedservices/notification';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true
})
export class Header implements OnInit {
  studentName: string = '';
  isSidebarOpen: boolean = false;
  isDarkMode = true;
  

  notifications: AppNotification[] = [];
  showDropdown = false;

  constructor(
    private router: Router,
    private studentService: StudentService,
    private toaster: ToasterService,
    private notificationService: NotificationService
  ) {

  }

  @Output() toggleSidebar = new EventEmitter<void>();

  ngOnInit(): void {
    this.loadStudentName();
    this.loadNotifications();
  }

  loadStudentName() {
    this.studentService.getProfile().subscribe({
      next: (student: Student) => {
        this.studentName = student.name;
      },
      error: (err) => {
        console.error('Error loading student profile', err);
      }
    });
  }

  loadNotifications() {
    this.notificationService.getAll().subscribe(data => this.notifications = data);
  }

  toggleNotifications() {
    this.showDropdown = !this.showDropdown;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  onLogout() {
    localStorage.removeItem('token');
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
