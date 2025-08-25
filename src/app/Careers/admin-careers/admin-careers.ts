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
    this.careersService.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }

  addJob() {
    if (this.newJob.company && this.newJob.role && this.newJob.applyUrl) {
      this.careersService.addJob(this.newJob).subscribe(() => {
        this.newJob = { 
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
        this.loadJobs();
      });
    }
  }

 deleteJob(id?: string) {
  if (!id) return; // Do nothing if no id
  this.careersService.deleteJob(id).subscribe(() => this.loadJobs());
}
 

  editMode: boolean = false;
editJobId: string | null = null;

startEdit(job: any) {
  this.editMode = true;
  this.editJobId = job._id;
  this.newJob = { ...job }; // Populate form with existing data
}

updateJob() {
  if (this.editJobId) {
    this.careersService.updateJob(this.editJobId, this.newJob).subscribe(() => {
      this.editMode = false;
      this.editJobId = null;
      this.newJob = { 
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
      this.loadJobs();
    });
  }
}


}
