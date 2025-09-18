import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingCoursesService } from '../../shared/sharedservices/upcoming-courses';
import { Header } from '../Student-components/header/header';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { UpcomingCourse } from '../../shared/components/models/upcoming-course.model';
import { ToasterService } from '../../shared/sharedservices/toaster';

import Swal from 'sweetalert2';

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


enroll() {
  Swal.fire({
    title: 'Stay Tuned! 🎉',
    text: 'We will update you soon. 😊',
    icon: 'info',
    confirmButtonText: 'Okay',
    customClass: {
      confirmButton:
        'bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg',
    },
    buttonsStyling: false,
  });
}


}
