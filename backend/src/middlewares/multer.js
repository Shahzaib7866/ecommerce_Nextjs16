import multer from "multer";
import path from "path";

// Recommended Production Setup: instead of dest: "uploads/" use multer.diskStorage jisme aap file type check aur size limit laga sakein.

// 1. Storage engine setup (File ka naam aur destination control karne ke liye)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Unique name banana taake file match na ho
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// 2. File Filter (Sirf images allow karne ke liye)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png formats are allowed!"), false);
  }
};

// 3. Multer middleware with limits
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB limit
  fileFilter: fileFilter,
});

export default upload;
