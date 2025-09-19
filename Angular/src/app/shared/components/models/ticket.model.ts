export interface Reply {
  _id: string;         // ✅ add this
  sender: string;
  message: string;
  createdAt: string;
}

export interface Ticket {
  _id?: string;
  subject: string;
  message: string;
  status?: 'open' | 'in-progress' | 'closed';
  reply?: string;
  createdAt: string;
  updatedAt?: string;
  studentId?: {
    _id: string;
    name: string;
  };
  replies: Reply[];   // ✅ use Reply type
}
