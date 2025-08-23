import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportService } from '../../shared/sharedservices/admin/support';
import { Sidebar } from '../Admin-components/sidebar/sidebar';
import { Ticket } from '../../shared/models/ticket.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-support',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar,HttpClientModule],
  templateUrl: './admin-support.html',
})
export class AdminSupport implements OnInit {
  isSidebarOpen = false;
  tickets: Ticket[] = []; 
  replyMessage: string = '';

  constructor(private supportService: SupportService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.supportService.getTickets().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets;
      },
      error: (err: any) => {
        console.error('Error loading tickets', err);
      }
    });
  }

  updateStatus(ticketId: string, status: string) {
    this.supportService.updateStatus(ticketId, status).subscribe({
      next: () => this.loadTickets(),
      error: (err: any) => console.error('Error updating status', err)
    });
  }

sendReply(ticketId: string) {
  if (!this.replyMessage.trim()) return;

  this.supportService.replyToTicket(ticketId, this.replyMessage).subscribe({
    next: (updatedTicket: any) => {
      const index = this.tickets.findIndex(t => t._id === updatedTicket._id);
      if (index !== -1) {
        this.tickets[index] = updatedTicket; // ✅ use tickets here
      }
      this.replyMessage = '';
    },
    error: (err) => console.error('Reply failed', err)
  });
}


  deleteTicket(ticketId: string) {
    if (confirm("Are you sure you want to delete this ticket?")) {
      this.supportService.deleteTicket(ticketId).subscribe({
        next: () => {
          this.tickets = this.tickets.filter(ticket => ticket._id !== ticketId);
        },
        error: (err) => {
          console.error("Error deleting ticket:", err);
        }
      });
    }
  }

  // ✅ Helper for displaying student name/email
getStudentName(ticket: Ticket): string {
  if (ticket.studentId && typeof ticket.studentId === 'object') {
    const student: any = ticket.studentId;
    return `${student.name} (${student.email})`;
  }
  return ticket.studentId ? String(ticket.studentId) : 'Unknown';
}

}
