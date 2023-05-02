const db = require("../db/dbConfig.js");

const getAllBookmarks = async () => {
  try {
    const result = await db.any("SELECT * FROM bookmarks");
    return { result };
  } catch (error) {
    return { error };
  }
};

const getBookmark = async (id) => {
  try {
    const result = await db.any(`SELECT * FROM bookmarks WHERE id=${id}`);
    return { result };
  } catch (error) {
    return { error };
  }
};

const createBookmark = async (bookmark) => {
  try {
    const result = await db.one(
      `INSERT INTO
        bookmarks(name,  url, is_favorite, category)
       VALUES
        ($1, $2, $3, $4)
       RETURNING *;`,
      [bookmark.name, bookmark.url, bookmark.is_favorite, bookmark.category]
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

const deleteBookmark = async (id) => {
  try {
    const result = await db.one(
      "DELETE FROM bookmarks WHERE id=$1 RETURNING *",
      id
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

const updateBookmark = async (id, bookmark) => {
  try {
    const result = await db.one(
      `UPDATE bookmarks SET name=$1, url=$2, category=$3, is_favorite=$4 WHERE id=$5 RETURNING *`,
      [bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite, id]
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
};
