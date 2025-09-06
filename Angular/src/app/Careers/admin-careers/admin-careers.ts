import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../admin/Admin-components/sidebar/sidebar';
import { CareersService } from '../../shared/sharedservices/admin/careers';

interface Job {
  _id?: string;  // <-- Add this optional property
  company: string;
  role: string;
  skills: string;
  salary: string;
   lastDate: string;
     education: string; 
     experience: string;    
  workType: string;      
  location: string;      
  applyUrl: string;
}


@Component({
  selector: 'app-admin-careers',
  standalone: true,
  imports: [CommonModule, FormsModule,Sidebar],
  templateUrl: './admin-careers.html',
  styleUrls: ['./admin-careers.css']
})
export class AdminCareers {
    isSidebarOpen = false;
    isLoading: boolean = false;

toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  jobs: Job[] = [];
  newJob: Job = { 
  company: '', 
  role: '', 
  skills: '', 
  salary: '', 
  lastDate: '', 
  education: '',
  experience: '',
  workType: '', 
  location: '', 
  applyUrl: '' 
};



  constructor(private careersService: CareersService) {}

  ngOnInit() {
    this.loadJobs();
  }


 
loadJobs() {
  this.isLoading = true;
  this.careersService.getJobs().subscribe({
    next: (data) => {
      this.jobs = data;
      this.isLoading = false;
    },
    error: () => {
      this.isLoading = false;
    }
  });
}

addJob() {
  if (this.newJob.company && this.newJob.role && this.newJob.applyUrl) {
    this.isLoading = true;
    this.careersService.addJob(this.newJob).subscribe(() => {
      this.newJob = { 
        company: '', role: '', skills: '', salary: '', lastDate: '',
        education: '', experience: '', workType: '', location: '', applyUrl: ''
      };
      this.loadJobs();
      this.isLoading = false;
    }, () => this.isLoading = false);
  }
}

deleteJob(id?: string) {
  if (!id) return;
  this.isLoading = true;
  this.careersService.deleteJob(id).subscribe(() => {
    this.loadJobs();
    this.isLoading = false;
  }, () => this.isLoading = false);
}

updateJob() {
  if (this.editJobId) {
    this.isLoading = true;
    this.careersService.updateJob(this.editJobId, this.newJob).subscribe(() => {
      this.editMode = false;
      this.editJobId = null;
      this.newJob = { 
        company: '', role: '', skills: '', salary: '', lastDate: '',
        education: '', experience: '', workType: '', location: '', applyUrl: ''
      };
      this.loadJobs();
      this.isLoading = false;
    }, () => this.isLoading = false);
  }
}

  editMode: boolean = false;
editJobId: string | null = null;

startEdit(job: any) {
  this.editMode = true;
  this.editJobId = job._id;
  this.newJob = { ...job }; // Populate form with existing data
}



}
