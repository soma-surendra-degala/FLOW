import { Component } from '@angular/core';
import { CareersService } from '../../shared/sharedservices/careers';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../student/Student-components/sidebar/sidebar';
import { Header } from '../../student/Student-components/header/header';

interface Career {
  company: string;
  role: string;
  skills: string;
  experience: string;
  workType: string;
  location: string;
  salary: string;
  lastDate: string;
  applyUrl: string;
}


@Component({
  selector: 'app-student-careers',
  imports: [CommonModule,FormsModule,Sidebar,Header],
  templateUrl: './student-careers.html',
  styleUrl: './student-careers.css'
})
export class StudentCareers {

  jobs: Career[] = [];
  loading = true;

  constructor(private careerService: CareersService) {}

 
  ngOnInit(): void {
    this.careerService.getCareers().subscribe({
      next: (data: Career[]) => {
        this.jobs = data;
        this.loading = false;
      },
      error: (err:any) => {
        console.error('Error fetching careers:', err);
        this.loading = false;
      }
    });
  }

}