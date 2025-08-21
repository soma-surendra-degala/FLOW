export interface Course {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  videoUrl: string;
  progress: number;
  fileUrl?: string;
   skills?: string[];
}
