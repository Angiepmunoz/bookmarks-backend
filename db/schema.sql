DROP DATABASE IF EXISTS bookmarks_dev;
CREATE DATABASE bookmarks_dev;

\c bookmarks_dev;

CREATE TABLE bookmarks (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 url TEXT NOT NULL,
 category TEXT,
 is_favorite BOOLEAN DEFAULT FALSE
);

CREATE TABLE reviews (
 id SERIAL PRIMARY KEY,
 reviewer TEXT NOT NULL,
 title TEXT NOT NULL,
 content TEXT NOT NULL,
 rating NUMERIC,
 CHECK (rating >= 0 AND rating <= 5),
 bookmark_id INTEGER NOT NULL REFERENCES bookmarks (id)
 ON DELETE CASCADE
);