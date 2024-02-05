import mongoose from "mongoose";
import { dbname } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${dbname}`
    );
    console.log(
      `\n MONGODB Connected !! DB HOST: $${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR:  ", error);
    process.exit(1);
  }
};

export default connectDB;