const knex = require("../db/connection");

function list() {
  return knex("comments").select("*");
}

function listCommenterCount() {
  return knex("comments as c")
    .join("users as u", "c.commenter_id", "u.user_id")
    .select("user_email as commenter_email")
    .count("c.comment")
    .groupBy("commenter_email")
    .orderBy("commenter_email");
}

function read(commentId) {
  return knex("posts as p")
    .join("comments as c", "p.post_id", "c.post_id")
    .join("users as u", "c.commenter_id", "u.user_id")
    .select(
      "comment_id",
      "comment",
      "user_email as commenter_email",
      "post_body as commented_post"
    )
    .where({ comment_id: commentId })
    .first(); //returns the first row in the table as an object
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
