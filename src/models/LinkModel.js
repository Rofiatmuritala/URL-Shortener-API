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
      match: [
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "The link must be a valid link",
      ],
    },
    shortCode: {
      type: String,
      unique: true,
      default: generateShortCode(),
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

linkSchema.virtual("shortLink").get(function () {
  return `http://localhost:4000/${this.shortCode}`;
});

const Link = mongoose.model("Link", linkSchema);

export default Link;
