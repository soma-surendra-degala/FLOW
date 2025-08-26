// src/app/shared/models/practice.model.ts
export interface Practice {
  _id?: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard'; // ✅ Add this
  categories?: string[]; // ✅ Add this
  solution?: string; // ✅ Add this
  userAnswer?: string;
  status?: 'Pending' | 'Completed';
}
