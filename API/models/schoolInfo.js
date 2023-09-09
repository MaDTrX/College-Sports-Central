import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sportCodeSchema = {
  MBA: {
    type: String,
    required: false,
  },
  MBB: {
    type: String,
    required: false,
  },
  MFB: {
    type: String,
    required: false,
  },
  MGY: {
    type: String,
    required: false,
  },
  MIH: {
    type: String,
    required: false,
  },
  "Men's Soccer": {
    type: String,
    required: false,
  },
  MTO: {
    type: String,
    required: false,
  },
  WBB: {
    type: String,
    required: false,
  },
  "Women's Gymnastics": {
    type: String,
    required: false,
  },
  WIH: {
    type: String,
    required: false,
  },
  WSO: {
    type: String,
    required: false,
  },
  WTO: {
    type: String,
    required: false,
  },
  WVB: {
    type: String,
    required: false,
  },
  MTI: {
    type: String,
    required: false,
  },
  WTI: {
    type: String,
    required: false,
  },
};

const schoolInfoSchema = new Schema(
  {
    div: {
      type: String,
      required: false,
    },
    affiliate: {
      type: String,
      required: false,
    },
    schoolName: {
      type: String,
      required: false,
    },
    athleticURL: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    primaryBackground: {
      type: String,
      required: false,
    },
    primaryText: {
      type: String,
      required: false,
    },
    safeTextWhite: {
      type: String,
      required: false,
    },
    safeTextBlack: {
      type: String,
      required: false,
    },
    accountID: {
      type: String,
      required: true,
      unique: true,
    },
    orgID: {
      type: String,
      required: true,
      unique: true,
    },
    conferenceID: {
      type: Number,
      required: false,
    },
    conferenceName: {
      type: String,
      required: false,
    },
    schoolNameAliases: {
      type: Array,
      required: false,
    },
    schoolSportCodeUrls: sportCodeSchema,
  },
  {
    timestamps: true,
  }
);

export const SchoolInfo = mongoose.model("SchoolInfo", schoolInfoSchema);
