import mongoose from "mongoose";
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
  return `http://localhost:4000/links/${this.shortCode}`;
});

// Define a virtual field for clicks
linkSchema.virtual("clicks", {
  ref: "Click",
  localField: "_id",
  foreignField: "link",
});

const Link = mongoose.model("Link", linkSchema);

export default Link;
