import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import courseRoutes from "./routes/courseRoutes.js";
import practiceRoutes from "./routes/practiceRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import upcomingCourses from "./routes/upcomingCourses.js";
import supportRoutes from "./routes/supportRoutes.js";
import careersRoutes from "./routes/careersRoutes.js"

dotenv.config();
const app = express();

// ✅ File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS config (only once)
app.use(cors({
  origin: [
    "http://localhost:4200",       // Angular local dev
    "https://flowlms.netlify.app"  // Deployed Angular app
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// ✅ Middleware
app.use(express.json());  // parse JSON
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // static file serving

// ✅ API Routes
app.use("/api/courses", courseRoutes);
app.use("/api/practices", practiceRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/upcoming-courses", upcomingCourses);
app.use("/api/support", supportRoutes);
app.use("/api/careers",careersRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(5000, () => console.log("🚀 Server running on port 5000"));
})
.catch(err => console.error("❌ DB Connection Error:", err));
