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
  ticket = { subject: '', message: '' };
  myTickets: Ticket[] = [];
  editMode = false;
  editingTicketId: string | null = null;

  constructor(private supportService: SupportService) {}

  ngOnInit(): void {
    this.loadMyTickets();
  }

  loadMyTickets() {
    this.supportService.getMyTickets().subscribe({
      next: (tickets) => {
        this.myTickets = tickets;
      },
      error: (err:any) => console.error(err)
    });
  }

submitTicket() {
  if (this.editMode && this.editingTicketId) {
    // Find original ticket so we include all fields
    const originalTicket = this.myTickets.find(t => t._id === this.editingTicketId);
    if (!originalTicket) {
      console.error('Original ticket not found');
      return;
    }

    const updatedTicket = {
      ...originalTicket, // keep all fields like _id, status, userId
      subject: this.ticket.subject,
      message: this.ticket.message
    };

    this.supportService.updateTicket(this.editingTicketId, updatedTicket).subscribe({
      next: () => {
        this.resetForm();
        this.loadMyTickets();
      },
      error: (err: any) => console.error('Update failed:', err)
    });
  } else {
    // Create new ticket
    this.supportService.createTicket(this.ticket).subscribe({
      next: () => {
        this.resetForm();
        this.loadMyTickets();
      },
      error: (err: any) => console.error('Create failed:', err)
    });
  }
}


  editTicket(ticket: Ticket) {
    this.ticket = { subject: ticket.subject, message: ticket.message };
    this.editMode = true;
    this.editingTicketId = ticket._id ?? null; // ✅ Fixed type issue
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.ticket = { subject: '', message: '' };
    this.editMode = false;
    this.editingTicketId = null;
  }

deleteReply(ticketId: string | undefined, replyId: string | undefined) {
  if (!ticketId || !replyId) return; // Prevent invalid call
  this.supportService.deleteReply(ticketId, replyId).subscribe({
    next: () => this.loadMyTickets(),
    error: (err: any) => console.error(err)
  });
}

deleteTicket(ticketId: string | undefined) {
  if (!ticketId) return; // Prevent invalid call
  this.supportService.deleteTicket(ticketId).subscribe({
    next: () => this.loadMyTickets(),
    error: (err: any) => console.error(err)
  });
}


}
