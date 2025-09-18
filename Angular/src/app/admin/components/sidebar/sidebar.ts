import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '../../../shared/sharedservices/toaster';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule,CommonModule],
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  isSidebarOpen = false;
   @Input() isOpen: boolean = true; // default open

  constructor(private router: Router,private toaster: ToasterService  ) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  dashboard() {
    this.router.navigate(['admin/']);
    this.isSidebarOpen = false;
  }

  students() {
    this.router.navigate(['admin/students']);
    this.isSidebarOpen = false;
  }

  courses() {
    this.router.navigate(['admin/courses']);
    this.isSidebarOpen = false;
  }
  upcoming_courses(){
    this.router.navigate(['admin/upcoming-courses']);
    this.isSidebarOpen = false;
  }

  practice() {
    this.router.navigate(['admin/practice']);
    this.isSidebarOpen = false;
  }
    support() {
    this.router.navigate(['admin/support']);
    this.isSidebarOpen = false;
  }
  logout() {
    this.router.navigate(['admin/login'])
    this.toaster.show('Logged out successfully','success');
  }
  openCareers() {
  this.router.navigate(['admin/careers'])
}

}
