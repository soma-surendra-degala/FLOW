import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../Admin-components/sidebar/sidebar';

import { Student } from '../../shared/models/student.model';
import { StudentService } from '../../shared/sharedservices/admin/students';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true, // ✅ added for clarity
  imports: [FormsModule, CommonModule, Sidebar],
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students implements OnInit {
  isSidebarOpen = false;
  students: Student[] = [];

  // ✅ Loader state
  isLoading = true;

  constructor(private studentService: StudentService, private router: Router) {}

  viewDetails(studentId: string | undefined) {
    if (!studentId) return; 
    this.router.navigate(['/admin/students', studentId]);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch students:', err);
        this.isLoading = false;
      }
    });
  }

  updateStudent(student: Student) {
    if (!student._id) return;

    this.isLoading = true;
    this.studentService.updateStudent(student._id, {
      phone: student.phone,
      location: student.location,
      gender: student.gender
    }).subscribe({
      next: (res: any) => {
        console.log('Student updated', res);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Update failed', err);
        this.isLoading = false;
      }
    });
  }
}
