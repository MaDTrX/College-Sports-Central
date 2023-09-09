import mongoose from "mongoose"
const Schema = mongoose.Schema;

const distSchema = new Schema({
  schoolName: {
    type: String,
    required: false,
  },
  distance: {
    type: String,
    required: false,
  },
});

const coordsSchema = new Schema({
  Lat: {
    type: Number,
    required: false,
  },
  Lng: {
    type: Number,
    required: false,
  },
});

const competitionSchema = new Schema(
  {
    academicYear: {
      type: Number,
      required: false,
    },
    sportCode: {
      type: String,
      required: false,
    },
    accountID: {
      type: Number,
      required: false,
    },
    ncaaOrgId: {
      type: Number,
      required: false,
    },
    opponentAccountID: {
      type: Number,
      required: false,
    },
    opponentNCAAOrgId: {
      type: Number,
      required: false,
    },
    compEventTimeZone: {
      type: String,
      required: false,
    },
    latLng: coordsSchema,
    compEventDistances: [distSchema],
    schoolName: {
      type: String,
      required: false,
    },
    compEventName: {
      type: String,
      required: false,
    },
    compEventLocName: {
      type: String,
      required: false,
    },
    venueHostStatus: {
      type: String,
      required: false,
    },
    compEventDateTime: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
export const Competition = mongoose.model("Competition", competitionSchema);
