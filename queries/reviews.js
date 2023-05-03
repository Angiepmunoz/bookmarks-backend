const db = require("../db/dbConfig.js");

const getAllReviewsByBookmark = async (bookmarkId) => {
  try {
    const result = await db.any("SELECT * FROM reviews WHERE bookmark_id=$1", [
      bookmarkId,
    ]);
    return { result };
  } catch (error) {
    return { error };
  }
};

const getReview = async (id) => {
  try {
    const result = await db.one(`SELECT * FROM reviews WHERE id=${id}`);
    return { result };
  } catch (error) {
    return { error };
  }
};

const createReview = async (review) => {
  try {
    const result = await db.one(
      `INSERT INTO
        reviews(bookmark_id, reviewer, title, content, rating)
       VALUES
        ($1, $2, $3, $4, $5)
       RETURNING *;`,
      [
        review.bookmark_id,
        review.reviewer,
        review.title,
        review.content,
        review.rating,
      ]
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

const deleteReview = async (id) => {
  //bookmarks/id
  try {
    const result = await db.one(
      "DELETE FROM reviews WHERE id=$1 RETURNING *",
      id
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

const updateReview = async (id, review) => {
  // bookmarks/id
  try {
    const result = await db.one(
      `UPDATE reviews SET bookmark_id=$1, reviewer=$2, title=$3, content=$4, rating=$5 WHERE id=$6 RETURNING *`,
      [
        review.bookmark_id,
        review.reviewer,
        review.title,
        review.content,
        review.rating,
        id,
      ]
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getAllReviewsByBookmark,
  getReview,
  createReview,
  deleteReview,
  updateReview,
};
