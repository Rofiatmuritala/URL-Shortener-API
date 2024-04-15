import mongoose from "mongoose";

// Define schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Your name is required"],
  },
  userName: {
    type: String,
    required: [true, "Your username is required"],
  },
  email: {
    type: String,
    required: [true, "Your email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
