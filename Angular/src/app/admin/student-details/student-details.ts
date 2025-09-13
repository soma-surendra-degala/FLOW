import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Sidebar } from '../Admin-components/sidebar/sidebar';
import { StudentService } from '../../shared/sharedservices/admin/students';
import { Student } from '../../shared/models/student.model';
import { ToasterService } from '../../shared/sharedservices/admin/toaster';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-student-detail',
  standalone: true,
  imports: [CommonModule, Sidebar], // add FormsModule/RouterModule if needed
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
    private studentService: StudentService,
    private toaster: ToasterService
  ) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Fetching student with ID:', id);

    this.studentService.getStudent(id!).subscribe({
      next: (data: Student) => {
        console.log('Student data received:', data);
        this.student = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching student:', err);
        this.loading = false;
      },
    });
  }

  onDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This student will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        confirmButton:
          'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg ml-2',
        cancelButton:
          'bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe({
          next: () => {
            this.toaster.show('🗑️ Student deleted successfully', 'success');
            this.router.navigate(['/admin/students']);
          },
          error: (err) => {
            console.error('Delete failed:', err);
            this.toaster.show('❌ Failed to delete student', 'error');
          },
        });
      }
    });
  }

  // Returns the correct avatar URL
  getAvatarUrl(avatar: string): string {
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
