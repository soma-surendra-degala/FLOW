import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingCoursesService } from '../../shared/sharedservices/admin/upcoming-courses';
import { Header } from '../Student-components/header/header';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { UpcomingCourse } from '../../shared/models/upcoming-course.model';
import { ToasterService } from '../../shared/sharedservices/admin/toaster';

@Component({
  selector: 'app-student-upcoming-courses',
  standalone: true,
  imports: [CommonModule, Header, Sidebar],
  templateUrl: './student-upcoming-courses.html',
  styleUrls: ['./student-upcoming-courses.css']
})
export class StudentUpcomingCourses implements OnInit {
  courses: UpcomingCourse[] = [];
  loading = true;

  constructor(private upcomingService: UpcomingCoursesService, private toaster: ToasterService) {}

  ngOnInit(): void {
    this.upcomingService.getAll().subscribe({
      next: (data) => {
        this.courses = Array.isArray(data) ? data : (data.courses || []);
        this.loading = false;
      },
      error: (err) => {
        console.error("❌ Error loading upcoming courses:", err);
        this.loading = false;
      }
    });
  }
  enroll(){
    this.toaster.show('Stay Tuned! We will update you soon.😊', 'info');
  }

}
