import mongoose, { Schema } from "mongoose";
import { generateShortCode } from "../utils/generateShortCode.js";

const linkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    actualLink: {
      type: String,
      required: [true, "The link is required"],
      // regex
      match: [
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "The link must be a valid link",
      ],
    },
    shortCode: {
      type: String,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The user is required"],
    },
    // clicks: {
    //   type: Number,
    //   default: 0,
    // },
  },
  {
    // it automatically update createdAt and updatedAt
    timestamps: true,
    // allows us to create a virtual code example shortlink. shortlink is not in the schema
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

linkSchema.virtual("shortLink").get(function () {
  return `${process.env.BACKEND_URI}/${this.shortCode}`;
});

// Define a virtual field for clicks
linkSchema.virtual("clicks", {
  ref: "Click",
  localField: "_id",
  foreignField: "link",
});

const Link = mongoose.model("Link", linkSchema);

export default Link;
