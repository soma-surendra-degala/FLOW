import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Header } from '../Student-components/header/header';
import { Sidebar } from '../Student-components/sidebar/sidebar';
import { SupportService } from '../../shared/sharedservices/admin/support';
import { Ticket } from '../../shared/models/ticket.model';



@Component({
  selector: 'app-student-support',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Sidebar, HttpClientModule],
  templateUrl: './student-support.html',
  styleUrls: ['./student-support.css']
})
export class StudentSupport implements OnInit {
  ticket: { subject: string; message: string } = {
  subject: '',
  message: ''
};

  myTickets: Ticket[] = [];

  constructor(private supportService: SupportService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.supportService.getMyTickets().subscribe({
      next: tickets => {
        console.log('Fetched tickets:', tickets); // 🟢 debug
        this.myTickets = tickets;
      },
      error: err => console.error('Error fetching tickets:', err)
    });
  }

  // Submit new ticket
  submitTicket(): void {
    if (!this.ticket.subject || !this.ticket.message) {
      console.warn('Subject and message are required');
      return;
    }

    this.supportService.createTicket(this.ticket).subscribe({
      next: (res) => {
        console.log('Ticket created:', res);
        this.loadTickets(); // refresh ticket list
        this.ticket = { subject: '', message: '' }; // reset form
      },
      error: (err) => console.error('Error creating ticket:', err)
    });
  }
}