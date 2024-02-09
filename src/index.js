import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
path: "./env", dotenv.config({});

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Sever is running at port: ${port} `);
    });
    //app.on
  })
  .catch((error) => {
    console.log("MONGODB Connection failed!!! ", error);
  });
