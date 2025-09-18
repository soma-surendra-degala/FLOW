export interface Course {
  _id?: string;
  title: string;
  description: string;
  icon: string;

  // ✅ Skills
  skills?: string[];

  // ✅ Multiple videos
  videos?: { title: string; url: string }[];

  // ✅ Multiple files
  files?: { name: string; url: string }[];

  // Optional legacy support
  videoUrl?: string;
  fileUrl?: string;

  progress?: number;
}
