import mongoose from "mongoose";

const User = mongoose.Schema({
    name: String,
    dob: Date,
    address: String,
    income: Number,
    employment: String,
    aadhar: String,
    pan: String,
    profile: String,
    signature: String,
    status: {
      type: String,
      default: "pending",
    },
    },
  {timestamps: true,}
);

export default mongoose.models.User || mongoose.model("User", User);