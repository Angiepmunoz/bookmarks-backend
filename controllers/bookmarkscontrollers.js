const express = require("express");
const bookmarks = express.Router();
const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
} = require("../queries/bookmarks.js");
const {validateURL} = require("../validations/validations.js")

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

// show
bookmarks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const bookmark = await getBookmark(id);
  console.log(bookmark);
  if (!bookmark.error) {
    res.status(200).json(bookmark);
  } else if (bookmark.error.code === 0) {
    res.status(404).json({ error: "bookmark not found" });
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// create
bookmarks.post(
  "/", validateURL,
  (req, res, next) => {
    // validate req.body
    const { name, url, is_favorite, category } = req.body;
    if (!name || !url || !is_favorite || !category) {
      return res
        .status(422)
        .json({ error: "body requires name, url, is_favorite, and category" });
    }

    next();
  },
  async (req, res) => {
    const { name, url, is_favorite, category } = req.body;

    const newBookmark = await createBookmark({
      name,
      url,
      is_favorite,
      category,
    });
    if (!newBookmark.error) {
      res.status(201).json(newBookmark);
    } else {
      res.status(500).json({ error: "server error" });
    }
  }
);

// update bookmark
bookmarks.put("/:id", validateURL, async (req, res) => {
  const { id } = req.params;
  const bookmark = req.body;
  const updatedBookmark = await updateBookmark(id, bookmark);
  res.status(200).json(updatedBookmark);
});

bookmarks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBookmark = await deleteBookmark(id);
  console.log(deletedBookmark);
  if (deletedBookmark.id) {
    res.status(201).json(deletedBookmark);
  } else {
    res.status(404).json("Bookmark not found");
  }
});

module.exports = bookmarks;
