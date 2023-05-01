const express = require("express");
const reviews = express.Router();
const {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require("../queries/reviews.js");

// index
reviews.get("/", async (req, res) => {
  const allReviews = await getAllReviews();
  if (!allReviews.error) {
    res.status(200).json(allReviews);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// show
reviews.get("/:id", async (req, res) => {
  const { id } = req.params;
  const review = await getReview(id);
  if (!review.error) {
    res.status(200).json(review);
  } else if (review.error.code === 0) {
    res.status(404).json({ error: "Review not found" });
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// create
reviews.post("/", async (req, res) => {
  const { name, url, is_favorite, category } = req.body;

  const newReview = await createReview({
    name,
    url,
    is_favorite,
    category,
  });
  if (!newReview.error) {
    res.status(201).json(newReview);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// update Review
reviews.put("/:id", async (req, res) => {
  const { review_id } = req.params;
  const review = req.body;
  const updatedReview = await updateReview(review_id, review);
  res.status(200).json(updatedReview);
});

reviews.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedReview = await deleteReview(id);
  if (deletedReview.id) {
    res.status(201).json(deletedReview);
  } else {
    res.status(404).json("Review not found");
  }
});

module.exports = reviews;
