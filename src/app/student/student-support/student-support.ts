import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../Student-components/header/header';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-support',
  imports: [CommonModule ,FormsModule,Header,Sidebar],
  templateUrl: './student-support.html',
  styleUrl: './student-support.css'
})
export class StudentSupport {
  isSidebarOpen = false;

   ticket = { subject: '', message: '' };

  constructor(private http: HttpClient) {}

    toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  submitTicket() {
    if (!this.ticket.subject || !this.ticket.message) {
      alert('Please fill all fields');
      return;
    }

    this.http.post('http://localhost:5000/api/support', this.ticket)
      .subscribe({
        next: () => {
          alert('Ticket submitted successfully!');
          this.ticket = { subject: '', message: '' }; // reset
        },
        error: (err) => {
          console.error(err);
          alert('Error submitting ticket');
        }
      });
  }

}
