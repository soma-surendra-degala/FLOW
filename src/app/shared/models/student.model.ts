export interface Student {
  _id?: string;
  name: string;
  email: string;
  course?: string;
  status: 'Active' | 'Inactive';
  location?: string;
  gender?: 'Male' | 'Female' | 'Other';
  score?: number;
}
