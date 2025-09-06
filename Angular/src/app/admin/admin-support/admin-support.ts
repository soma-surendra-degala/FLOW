import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Sidebar } from '../Admin-components/sidebar/sidebar';

import { SupportService } from '../../shared/sharedservices/admin/support';
import { Ticket } from '../../shared/models/ticket.model';

@Component({
  selector: 'app-admin-support',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, HttpClientModule],
  templateUrl: './admin-support.html',
})
export class AdminSupport implements OnInit {
  isSidebarOpen = false;
  tickets: Ticket[] = [];
  selectedTicket?: Ticket;

  // ✅ Loading state
  isLoading: boolean = false;


  // ✅ Properties to manage editing state
  editingReplies: { [replyId: string]: boolean } = {};
  editedMessages: { [replyId: string]: string } = {};
  replyMessages: { [ticketId: string]: string } = {};

  constructor(
    private supportService: SupportService,
  ) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openTicket(ticket: Ticket) {
    this.selectedTicket = ticket;
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.isLoading = true;
    this.supportService.getTickets().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading tickets', err);
        this.isLoading = false;
      }
    });
  }

  updateStatus(ticketId: string, status: string) {
    this.isLoading = true;
    this.supportService.updateStatus(ticketId, status).subscribe({
      next: () => {
        this.loadTickets();
      },
      error: (err: any) => {
        console.error('Error updating status', err);
        this.isLoading = false;
      }
    });
  }

  sendReply(ticketId: string) {
    const message = this.replyMessages[ticketId]?.trim();
    if (!message) return;

    this.isLoading = true;
    this.supportService.replyToTicket(ticketId, { sender: 'Admin', message }).subscribe({
      next: (updatedTicket: Ticket) => {
        const index = this.tickets.findIndex(t => t._id === updatedTicket._id);
        if (index !== -1) this.tickets[index] = updatedTicket;
        if (this.selectedTicket && this.selectedTicket._id === updatedTicket._id) {
          this.selectedTicket = updatedTicket;
        }
        this.replyMessages[ticketId] = '';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Reply failed', err);
        this.isLoading = false;
      }
    });
  }

  startEdit(replyId: string, currentMessage: string) {
    this.editingReplies[replyId] = true;
    this.editedMessages[replyId] = currentMessage;
  }

  saveEdit(ticketId: string, replyId: string) {
    const newMessage = this.editedMessages[replyId]?.trim();
    if (!newMessage) return;

    this.isLoading = true;
    this.supportService.editReply(ticketId, replyId, newMessage).subscribe({
      next: (updatedTicket) => {
        const index = this.tickets.findIndex(t => t._id === updatedTicket._id);
        if (index !== -1) this.tickets[index] = updatedTicket;
        this.editingReplies[replyId] = false;
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Edit failed", err);
        
        this.isLoading = false;
      }
    });
  }

  cancelEdit(replyId: string) {
    this.editingReplies[replyId] = false;
  }

  deleteReply(ticketId: string, replyId: string) {
    this.isLoading = true;
    this.supportService.deleteReply(ticketId, replyId).subscribe({
      next: (updatedTicket) => {
        this.selectedTicket = updatedTicket;
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Failed to delete reply", err);
        
        this.isLoading = false;
      }
    });
  }

  deleteTicket(ticketId: string) {
    if (confirm("Are you sure you want to delete this ticket?")) {
      this.isLoading = true;
      this.supportService.deleteTicket(ticketId).subscribe({
        next: () => {
          this.tickets = this.tickets.filter(ticket => ticket._id !== ticketId);
          
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error deleting ticket:", err);
          
          this.isLoading = false;
        }
      });
    }
  }

  getStudentName(ticket: Ticket): string {
    if (ticket.studentId && typeof ticket.studentId === 'object') {
      const student: any = ticket.studentId;
      return `${student.name} (${student.email})`;
    }
    return ticket.studentId ? String(ticket.studentId) : 'Unknown';
  }
}
