import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import linkroute from "../routes/linksRoutes.js";
import userRoute from "../routes/usersRoutes.js";
dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URI }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUri = process.env.MONGO_URI;

try {
  await mongoose.connect(mongoUri);

  console.log("Database Connected");
} catch (error) {
  console.log(error);
}

const PORT = process.env.PORT;

app.use(linkroute);
app.use(userRoute);

app.listen(PORT, () => {
  console.log("App is running");
});
