import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingCoursesService } from '../../shared/sharedservices/admin/upcoming-courses';
import { Header } from '../Student-components/header/header';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { UpcomingCourse } from '../../shared/models/upcoming-course.model';

@Component({
  selector: 'app-student-upcoming-courses',
  standalone: true,
  imports: [CommonModule, Header, Sidebar],
  templateUrl: './student-upcoming-courses.html',
  styleUrls: ['./student-upcoming-courses.css']
})
export class StudentUpcomingCourses implements OnInit {
  courses: UpcomingCourse[] = [];

  constructor(private upcomingService: UpcomingCoursesService) {}

  ngOnInit(): void {
    this.upcomingService.getAll().subscribe({
      next: (data) => {
        console.log("Student fetched courses:", data);
        this.courses = Array.isArray(data) ? data : (data.courses || []);
      },
      error: (err) => {
        console.error("❌ Error loading upcoming courses:", err);
      }
    });
  }
  enroll(){
    alert('Stay Tune Will Update!😊');
  }

}
