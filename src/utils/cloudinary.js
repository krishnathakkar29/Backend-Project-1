import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINNARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFile) => {
  try {
    if (!localFile) {
      console.log("local file not found (try block if...)");
      return null;
    }
    const response = await cloudinary.uploader.upload(localFile, {
      //read documentation for more configs like this
      resource_type: "auto",
    });

    console.log("File is uploaded on cloudinary", response.url);
    //print the response as whole and not url
    return response;
  } catch (error) {
    fs.unlinkSync(localFile); //remove the locally saved temporary file as upload was unsuccessfull and does not save corrupted files
    console.log("error in cloudinary in utils")
    return null;
  }
};

export { uploadOnCloudinary };
