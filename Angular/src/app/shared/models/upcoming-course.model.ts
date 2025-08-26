export interface UpcomingCourse {
  title: string;
  startDate: string;
  duration: string;

  // ✅ Add these
  description?: string;  
  skills?: string[];
}
