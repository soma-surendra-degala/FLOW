import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Import routes
import courseRoutes from "./routes/courseRoutes.js";
import practiceRoutes from "./routes/practiceRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import upcomingCourses from "./routes/upcomingCourses.js";
import supportRoutes from "./routes/supportRoutes.js";
import careersRoutes from "./routes/careersRoutes.js";
import notificationRoutes from "./routes/notifications.js";


dotenv.config();
const app = express();

// ✅ File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure uploads folder exists
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📂 Created uploads folder");
}

// ✅ CORS config
app.use(
  cors({
    origin: [
      "http://localhost:4200", // Angular local dev
      "https://flowlms.netlify.app", // Deployed Angular app
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ Middleware
app.use(express.json()); // Parse JSON
app.use("/uploads", express.static(uploadPath)); // Serve uploaded images

// ✅ API Routes
app.use("/api/courses", courseRoutes);
app.use("/api/practices", practiceRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/upcoming-courses", upcomingCourses);
app.use("/api/support", supportRoutes);
app.use("/api/careers", careersRoutes);
app.use("/api/notifications", notificationRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");

    // ✅ Use Render’s PORT, fallback to 5000 for local dev
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));
