// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { SupportService } from '../../shared/sharedservices/admin/support';
// import { Sidebar } from '../Admin-components/sidebar/sidebar';
// import { Ticket } from '../../shared/models/ticket.model';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-admin-support',
//   standalone: true,
//   imports: [CommonModule, FormsModule, Sidebar,HttpClientModule],
//   templateUrl: './admin-support.html',
// })
// export class AdminSupport implements OnInit {
//   isSidebarOpen = false;
//   tickets: Ticket[] = []; 
//   selectedTicket?: Ticket;  
  
//    editingReplies: { [replyId: string]: boolean } = {};
//   editedMessages: { [replyId: string]: string } = {};

//   constructor(private supportService: SupportService) {}

//   toggleSidebar() {
//     this.isSidebarOpen = !this.isSidebarOpen;
//   }
//     openTicket(ticket: Ticket) {
//     this.selectedTicket = ticket;
//   }

//   ngOnInit(): void {
//     this.loadTickets();
//   }

//   loadTickets() {
//     this.supportService.getTickets().subscribe({
//       next: (tickets: Ticket[]) => {
//         this.tickets = tickets;
//       },
//       error: (err: any) => {
//         console.error('Error loading tickets', err);
//       }
//     });
//   }

//   updateStatus(ticketId: string, status: string) {
//     this.supportService.updateStatus(ticketId, status).subscribe({
//       next: () => this.loadTickets(),
//       error: (err: any) => console.error('Error updating status', err)
//     });
//   }
// replyMessages: { [ticketId: string]: string } = {};  // ✅ per ticket storage

// sendReply(ticketId: string) {
//   const message = this.replyMessages[ticketId]?.trim();
//   if (!message) return;

//   this.supportService.replyToTicket(ticketId, { sender: 'Admin', message }).subscribe({
//     next: (updatedTicket: Ticket) => {
//       const index = this.tickets.findIndex(t => t._id === updatedTicket._id);
//       if (index !== -1) {
//         this.tickets[index] = updatedTicket;
//       }
//       if (this.selectedTicket && this.selectedTicket._id === updatedTicket._id) {
//         this.selectedTicket = updatedTicket; // ✅ update selected ticket too
//       }
//       this.replyMessages[ticketId] = '';
//     },
//     error: (err) => console.error('Reply failed', err)
//   });
// }


// startEdit(replyId: string, currentMessage: string) {
//   this.editingReplies[replyId.toString()] = true;
//   this.editedMessages[replyId.toString()] = currentMessage;
// }

// saveEdit(ticketId: string, replyId: string) {
//   const id = replyId.toString();
//   const newMessage = this.editedMessages[id]?.trim();
//   if (!newMessage) return;

//   this.supportService.editReply(ticketId, id, newMessage).subscribe({
//     next: (updatedTicket) => {
//       const index = this.tickets.findIndex(t => t._id === updatedTicket._id);
//       if (index !== -1) this.tickets[index] = updatedTicket;
//       this.editingReplies[id] = false;
//     },
//     error: (err) => console.error("Edit failed", err)
//   });
// }

// cancelEdit(replyId: string) {
//   this.editingReplies[replyId.toString()] = false;
// }



// deleteReply(ticketId: string, replyId: string) {
//   this.supportService.deleteReply(ticketId, replyId).subscribe({
//     next: (updatedTicket) => {
//       this.selectedTicket = updatedTicket; // update UI
//     },
//     error: (err) => {
//       console.error("Failed to delete reply", err);
//     }
//   });
// }




//   deleteTicket(ticketId: string) {
//     if (confirm("Are you sure you want to delete this ticket?")) {
//       this.supportService.deleteTicket(ticketId).subscribe({
//         next: () => {
//           this.tickets = this.tickets.filter(ticket => ticket._id !== ticketId);
//         },
//         error: (err) => {
//           console.error("Error deleting ticket:", err);
//         }
//       });
//     }
//   }

//   // ✅ Helper for displaying student name/email
// getStudentName(ticket: Ticket): string {
//   if (ticket.studentId && typeof ticket.studentId === 'object') {
//     const student: any = ticket.studentId;
//     return `${student.name} (${student.email})`;
//   }
//   return ticket.studentId ? String(ticket.studentId) : 'Unknown';
// }

// }
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
  imports: [CommonModule, FormsModule, Sidebar, HttpClientModule],
  templateUrl: './admin-support.html',
})
export class AdminSupport implements OnInit {
  isSidebarOpen = false;
  tickets: Ticket[] = [];
  selectedTicket?: Ticket;
  
  // ✅ Properties to manage editing state
  editingReplies: { [replyId: string]: boolean } = {};
  editedMessages: { [replyId: string]: string } = {};

  constructor(private supportService: SupportService) {}

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

  replyMessages: { [ticketId: string]: string } = {};

  sendReply(ticketId: string) {
    const message = this.replyMessages[ticketId]?.trim();
    if (!message) return;

    this.supportService.replyToTicket(ticketId, { sender: 'Admin', message }).subscribe({
      next: (updatedTicket: Ticket) => {
        const index = this.tickets.findIndex(t => t._id === updatedTicket._id);
        if (index !== -1) {
          this.tickets[index] = updatedTicket;
        }
        if (this.selectedTicket && this.selectedTicket._id === updatedTicket._id) {
          this.selectedTicket = updatedTicket;
        }
        this.replyMessages[ticketId] = '';
      },
      error: (err) => console.error('Reply failed', err)
    });
  }

  startEdit(replyId: string, currentMessage: string) {
    this.editingReplies[replyId.toString()] = true;
    this.editedMessages[replyId.toString()] = currentMessage;
  }

  saveEdit(ticketId: string, replyId: string) {
    const id = replyId.toString();
    const newMessage = this.editedMessages[id]?.trim();
    if (!newMessage) return;

    this.supportService.editReply(ticketId, id, newMessage).subscribe({
      next: (updatedTicket) => {
        const index = this.tickets.findIndex(t => t._id === updatedTicket._id);
        if (index !== -1) this.tickets[index] = updatedTicket;
        this.editingReplies[id] = false;
      },
      error: (err) => console.error("Edit failed", err)
    });
  }

  cancelEdit(replyId: string) {
    this.editingReplies[replyId.toString()] = false;
  }

  deleteReply(ticketId: string, replyId: string) {
    this.supportService.deleteReply(ticketId, replyId).subscribe({
      next: (updatedTicket) => {
        this.selectedTicket = updatedTicket;
      },
      error: (err) => {
        console.error("Failed to delete reply", err);
      }
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

  getStudentName(ticket: Ticket): string {
    if (ticket.studentId && typeof ticket.studentId === 'object') {
      const student: any = ticket.studentId;
      return `${student.name} (${student.email})`;
    }
    return ticket.studentId ? String(ticket.studentId) : 'Unknown';
  }
}
