import { v2 as cloudinary } from 'cloudinary';
import { error } from 'console';
import dotenv from 'dotenv';    

import fs from 'fs'

// file mery pass ahy gi file-system(fs) k through, yani server pr already upload hai, server se local file ka path ko fr cloudinary ph daal dyun ga or agr successfully cludinary pr save ho gi tu local server se delete b krun ga


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); 


//organized way
//aik method mein parameter k through path of a file le lety hain or upload kr lety hain agr successfully upload ho gaya tu file o unlink kr de gy

const uploadtoCloudinary = async (localFilePath) => {
  try {
    if(!localFilePath) return error;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })
    console.log("file uploaded", response.url);
    
    return response;
    
  } catch (error) {

    //
    fs.unlinkSync(localFilePath);
    return null;
    
  }
}




export default cloudinary.v2;





