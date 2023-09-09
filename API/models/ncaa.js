import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ncaaSchema = new Schema(
  {
    orgID: {
      type: String,
      required: true,
      unique: true,
    },
    accountID: {
      type: String,
      required: true,
      unique: true,
    },
    accountName: {
      type: String,
      required: false,
    },
    divisionID: {
      type: String,
      required: false,
    },
    conferenceID: {
      type: String,
      required: false,
    },
    conferenceName: {
      type: String,
      required: false,
    },
    sportCode: {
      type: String,
      required: false,
    },
    apiURL: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

export const Ncaa = mongoose.model("Ncaa", ncaaSchema);
