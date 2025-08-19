import { Component, OnInit } from '@angular/core';
import { Student, StudentService } from '../../shared/sharedservices/students';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../Admin-components/sidebar/sidebar';


@Component({
  selector: 'app-students',
  imports:[FormsModule,CommonModule,Sidebar],
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        console.error('Failed to fetch students:', err);
      }
    });
  }

    updateStudent(student: Student) {
    if (!student._id) return;

    this.studentService.updateStudent(student._id, {
      status: student.status,
      location: student.location,
      gender: student.gender
    }).subscribe({
      next: (res: any) => console.log('Student updated', res),
      error: (err: any) => console.error('Update failed', err)
    });
  }


}
