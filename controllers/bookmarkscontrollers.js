const express = require("express");
const bookmarks = express.Router();
const { getAllBookmarks } = require("../queries/bookmarks.js");

// index
bookmarks.get("/", async (req, res) => {
  //http://localhost:5001/bookmarks
  const allBookmarks = await getAllBookmarks();
  if (!allBookmarks.error) {
    res.status(200).json(allBookmarks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = bookmarks;
