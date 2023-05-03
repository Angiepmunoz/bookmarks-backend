const express = require("express");
const bookmarks = express.Router();
const validateBookmark = require("../validations/validateBookmark.js");
const reviewsController = require("./reviewsController.js");
const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
} = require("../queries/bookmarks.js");

// What API endpoint should we use to request all reviews for a bookmark?

// GET /bookmarks/2/reviews

bookmarks.use("/:bookmarkId/reviews", reviewsController);

// index
bookmarks.get("/", async (req, res) => {
  const { error, result } = await getAllBookmarks();
  if (error) {
    res.status(500).json({ error: "server error" });
  } else {
    res.status(200).json(result);
  }
});

// show
bookmarks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { error, result } = await getBookmark(id);
  if (error?.code === 0) {
    res.status(404).json({ error: "bookmark not found" });
  } else if (error) {
    res.status(500).json({ error: "server error" });
  } else {
    res.status(200).json(result);
  }
});

// create
bookmarks.post("/", validateBookmark, async (req, res) => {
  const { error, result } = await createBookmark(req.body);
  if (error) {
    res.status(500).json({ error: "server error" });
  } else {
    res.status(201).json(result);
  }
});

// update bookmark
bookmarks.put("/:id", validateBookmark, async (req, res) => {
  const { id } = req.params;
  const { error, result } = await updateBookmark(id, req.body);
  if (error) {
    res.status(500).json({ error: "server error" });
  } else {
    res.status(200).json(result);
  }
});

bookmarks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { error, result } = await deleteBookmark(id);
  if (error) {
    res.status(404).json("Bookmark not found");
  } else {
    res.status(201).json(result);
  }
});

module.exports = bookmarks;
