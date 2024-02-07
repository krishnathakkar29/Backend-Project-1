// We assume ki file mere local server par aa gyi hai
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINNARY_SECRET_KEY,
});

const uploadOnCloudiary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //uploading file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath , {
        resource_type: "auto" //image, video etc
    });
    //file has been uploaded successful
    console.log("file upload successful on cloudinary", response.url);

    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath)
    //remove the locally saved temporary file on our server , as the upload operation got failed , we dont want to keep examples corrupted files on our local server
    return null;
  }
};

export {uploadOnCloudiary}
