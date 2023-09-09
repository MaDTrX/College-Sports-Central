import mongoose from "mongoose";
const Schema = mongoose.Schema;

const timeZoneSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
      unique: true,
    },
    timeZone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TimeZone = mongoose.model("TimeZone", timeZoneSchema);
