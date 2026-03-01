import express from "express";
import Vote from "../models/Vote.js";

const router = express.Router();

// POST - Cast Vote
router.post("/cast", async (req, res) => {
  try {
    const { voterId, candidate, transactionHash } = req.body;

    const existingVote = await Vote.findOne({ voterId });
    if (existingVote) {
      return res.status(400).json({ message: "You already voted" });
    }

    const newVote = new Vote({
      voterId,
      candidate,
      transactionHash,
    });

    await newVote.save();

    res.status(201).json({ message: "Vote cast successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET - Voting Results
router.get("/results", async (req, res) => {
  try {
    const results = await Vote.aggregate([
      {
        $group: {
          _id: "$candidate",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;