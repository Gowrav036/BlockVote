import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    voterId: {
      type: String,
      required: true,
      unique: true,
    },
    candidate: {
      type: String,
      required: true,
    },
    transactionHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;