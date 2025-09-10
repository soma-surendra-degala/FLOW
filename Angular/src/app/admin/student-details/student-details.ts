import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Sidebar } from '../Admin-components/sidebar/sidebar';
import { StudentService } from '../../shared/sharedservices/admin/students';
import { Student } from '../../shared/models/student.model';

@Component({
  selector: 'app-admin-student-detail',
  standalone: true,
  imports: [CommonModule,Sidebar], // add FormsModule/RouterModule if needed
  templateUrl: './student-details.html',
  styleUrls: ['./student-details.css'],
})

export class AdminStudentDetail {
  student: any;
  loading = true;
  isSidebarOpen = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private studentService: StudentService   // ✅ inject here
  ) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Fetching student with ID:", id);

  this.studentService.getStudent(id!).subscribe({
  next: (data: Student) => {
    console.log("Student data received:", data);
    this.student = data;
    this.loading = false;
  },
  error: (err: any) => {
    console.error("Error fetching student:", err);
    this.loading = false;
  }
});

  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        alert('Student deleted successfully');
        this.router.navigate(['/admin/students']);
      });
    }
  }
  // Returns the correct avatar URL
getAvatarUrl(avatar: string): string {
  // Use your deployed backend URL
  const baseUrl = 'https://flow-hp2a.onrender.com';
  if (!avatar) return 'assets/default-avatar.png';
  return avatar.startsWith('http') ? avatar : `${baseUrl}${avatar}`;
}

// Fallback if image fails to load
onAvatarError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = 'assets/default-avatar.png';
}

}
