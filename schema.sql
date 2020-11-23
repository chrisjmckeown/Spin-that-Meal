
DROP DATABASE IF EXISTS dinning_playlist_DB;
CREATE DATABASE dinning_playlist_DB;
-- sql to make yourself an admin. Replace ? with your id.
UPDATE
  dinning_playlist_db.user
SET
  admin = true
WHERE
  id = 1
