import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sportsSchema = {
  division: {
    type: String,
    required: false,
  },
  // sportCode: {
  //     type: String,
  //     required: false
  // },
  sportName: {
    type: String,
    required: false,
  },
  // season: {
  //     type: String,
  //     required: false
  // },
  // academicYear: {
  //     type: String,
  //     required: false
  // },
  scheduleUrl: {
    type: String,
    required: false,
  },
  deactivationDate: {
    type: String,
    required: false,
  },
  deactivationReason: {
    type: String,
    required: false,
  },
};

const schoolSportsSchema = new Schema(
  {
    division: {
      type: Number,
      required: false,
    },
    orgId: {
      type: String,
      required: true,
      unique: true,
    },
    accountId: {
      type: String,
      required: true,
      unique: true,
    },
    athleticUrl: {
      type: String,
      required: false,
    },
    parser: {
      type: String,
      required: false,
    },
    schoolName: {
      type: String,
      required: false,
    },
    schoolSports: [sportsSchema],
  },
  {
    timestamps: true,
  }
);

export const SchoolSport = mongoose.model("SchoolSports", schoolSportsSchema);
