const db = require("../db/dbConfig.js");

const getAllBookmarks = async () => {
  try {
    const allBookmarks = await db.any("SELECT * FROM bookmarks");
    return allBookmarks;
  } catch (error) {
    return { error: error };
  }
};

const getBookmark = async (id) => {
  console.log(id);
  try {
    const bookmark = await db.any(`SELECT * FROM bookmarks WHERE id=${id}`);
    return bookmark;
  } catch (error) {
    return { error: error };
  }
};

const createBookmark = async (bookmark) => {
  try {
    const newBookmark = await db.one(
      `INSERT INTO
        bookmarks(name,  url, is_favorite, category)
       VALUES
        ($1, $2, $3, $4)
       RETURNING *;`,
      [bookmark.name, bookmark.url, bookmark.is_favorite, bookmark.category]
    );
    return newBookmark;
  } catch (error) {
    return { error: error };
  }
};

const deleteBookmark = async (id) => {
  //bookmarks/id
  try {
    const deletedBookmark = await db.one(
      "DELETE FROM bookmarks WHERE id=$1 RETURNING *",
      id
    );
    return deletedBookmark;
  } catch (e) {
    return e;
  }
};

const updateBookmark = async (id, bookmark) => {
  // bookmarks/id
  try {
    const updatedBookmark = await db.one(
      `UPDATE bookmarks SET name=$1, url=$2, category=$3, is_favorite=$4 WHERE id=$5 RETURNING *`,
      [bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite, id]
    );
    return updatedBookmark;
  } catch (e) {
    return e;
  }
};

module.exports = {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
};
