import mongoose, { Schema } from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    link: {
      type: Schema.Types.ObjectId,
      ref: "Link",
      required: [true, "The link is required"],
    },
    client: {
      type: {
        type: String,
      },
      name: String,
    },
    os: {
      name: String,
      version: String,
      platform: String,
    },
    device: {
      type: {
        type: String,
      },
      brand: String,
      model: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Click = mongoose.model("Click", clickSchema);

export default Click;
