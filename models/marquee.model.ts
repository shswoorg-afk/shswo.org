
import { Schema, model } from "mongoose";

const marqueeSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },
  },
  { timestamps: true, versionKey: false },
);

const Marquee = model("Marquee", marqueeSchema);

export default Marquee;
