const express = require("express");
const reviews = express.Router();
const validateReview = require("../validations/validateReview.js");
const {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require("../queries/reviews.js");

// index
reviews.get("/", async (req, res) => {
  const { error, result } = await getAllReviews();
  if (error) {
    res.status(500).json({ error: "server error" });
  } else {
    res.status(200).json(result);
  }
});

// show
reviews.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { error, result } = await getReview(id);
  if (error?.code === 0) {
    res.status(404).json({ error: "Review not found" });
  } else if (error) {
    res.status(500).json({ error: "server error" });
  } else {
    res.status(200).json(result);
  }
});

// create
reviews.post("/", validateReview, async (req, res) => {
  const { error, result } = await createReview(req.body);
  if (error) {
    res.status(500).json({ error: "server error" });
  } else {
    res.status(201).json(result);
  }
});

// update Review
reviews.put("/:id", validateReview, async (req, res) => {
  const { id } = req.params;
  const { error, result } = await updateReview(id, req.body);
  if (error) {
    res.status(500).json({ error: "server error" });
  } else {
    res.status(200).json(result);
  }
});

reviews.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { error, result } = await deleteReview(id);
  if (error) {
    res.status(404).json("Review not found");
  } else {
    res.status(201).json(result);
  }
});

module.exports = reviews;
