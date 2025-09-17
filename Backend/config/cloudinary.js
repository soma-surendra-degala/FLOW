import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "uploads";

    if (file.mimetype.startsWith("video/")) {
      folder = "videos";
    } else if (file.mimetype.startsWith("image/")) {
      folder = "images";
    } else {
      folder = "documents";
    }

    return {
      folder,
      resource_type: "auto", // image, video, pdf, etc
      public_id: Date.now() + "-" + file.originalname.split(".")[0],
    };
  },
});

export const upload = multer({ storage });
