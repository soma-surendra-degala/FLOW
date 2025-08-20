export interface Student {
  _id?: string;
  name: string;
  email: string;
  course?: string;
  status?: string;
  location?: string;
  gender?: 'Male' | 'Female' | 'Other';
  year?: string;
  phone?: string;
  enrollment?: string;
  progress?: number;
  avatar?: string;
  college?: string;
}
