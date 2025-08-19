import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../Admin-components/sidebar/sidebar';


interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-students',
  imports: [FormsModule,CommonModule,Sidebar],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students {
students: Student[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Python', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'DSA', status: 'Inactive' },
    { id: 3, name: 'Alex Kumar', email: 'alex@example.com', course: 'Machine Learning', status: 'Active' }
  ];
}
