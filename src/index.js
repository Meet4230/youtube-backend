import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import express from "express";

const app = express();

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("NOT ABLE TO INTERACT WITH DB:", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      `Server is running at: ${process.env.PORT}`;
    });
  })
  .catch((err) => {
    console.log(`Database connection failed !!!`, err);
  });

/*
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    // Listners app.on()
    app.on("error", (error) => {
      console.log("NOT ABLE TO INTERACT WITH DB:", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
*/
