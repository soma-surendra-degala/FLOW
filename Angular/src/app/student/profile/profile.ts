import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { Header } from '../Student-components/header/header';
import { Student } from '../../shared/models/student.model';
import { StudentService } from '../../shared/sharedservices/admin/students';
import { ToasterService } from '../../shared/sharedservices/admin/toaster';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule, Sidebar, Header, HttpClientModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  profile: Student = {
    name: '',
    email: '',
    location: '',
    gender: undefined,
    avatar: '',
    college: '',
    course: '',
    year: '',
    phone: ''
  };

  selectedFile: File | null = null;
  loading = false;
  errorMessage = '';

  constructor(private studentService: StudentService, private toaster: ToasterService) {}

  ngOnInit() {
    this.loadProfile();
  }

  private getAvatarUrl(avatar: string | undefined): string {
  if (!avatar) return 'assets/default-avatar.png';
  if (avatar.startsWith('http')) return avatar;
  return `https://flow-hp2a.onrender.com/uploads/avatars/${avatar}`;
}


  

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.profile.avatar = reader.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  }
 

  loadProfile() {
  this.loading = true;
  this.studentService.getProfile().subscribe({
    next: data => {
      this.profile = { ...data };

      // if backend gives only filename
      if (data.avatar && !data.avatar.startsWith('http')) {
        this.profile.avatar = `https://flow-hp2a.onrender.com/uploads/avatars/${data.avatar}`;
      }

      this.loading = false;
    },
    error: err => {
      console.error('Error loading profile', err);
      this.errorMessage = err?.error?.message || 'Failed to load profile';
      this.loading = false;
    }
  });
}


saveProfile() {
  const formData = new FormData();
  formData.append('college', this.profile.college || '');
  formData.append('course', this.profile.course || '');
  formData.append('year', this.profile.year || '');
  formData.append('phone', this.profile.phone || '');
  if (this.selectedFile) formData.append('avatar', this.selectedFile, this.selectedFile.name);

  this.studentService.updateProfile(formData).subscribe({
    next: () => {
      this.toaster.show('✅ Profile updated successfully!', 'success');
      this.loadProfile(); // 👈 reload from DB instead of trusting update response
    },
    error: err => {
      console.error('Update failed', err);
      this.errorMessage = err?.error?.message || 'Failed to update profile';
    }
  });
}

}
