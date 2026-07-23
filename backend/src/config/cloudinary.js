import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// file mery pass ahy gi file-system(fs) k through, yani server pr already upload hai, server se local file ka path ko fr cloudinary ph daal dyun ga or agr successfully cludinary pr save ho gi tu local server se delete b krun ga

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,

  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
});

//organized way
//aik method mein parameter k through path of a file le lety hain or upload kr lety hain agr successfully upload ho gaya tu file o unlink kr de gy

const uploadtoCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return error;

    // Cloudinary par upload karein
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded", response.url);

    // Successfully upload hone ke baad local server se file delete kar dein
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    // Error aane par bhi local file ko delete kar dein taake server par kachra na bharay
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { cloudinary, uploadtoCloudinary };
