const express = require("express");
const router = express.Router();

const Posts = require("../data/db");

// Add a post
router.post("/", async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      const post = await Posts.insert(req.body);
      res.status(201).json(post);
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "There was an error while saving the post to the database"
    });
  }
});

// Add a new comment to a post
router.post("/:id/comments", async (req, res) => {
  try {
    const comments = await Posts.insertComment(req.body.comment);
    res.status(201).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There was an error while saving the comment to the database"
    });
  }
});

// Get posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

// Get posts by Id
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

// Get all of a posts comments
router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Posts.findPostComments(req.params.id);

    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: "no comments for this post" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Delete post by Id
router.delete("/:id", async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json(posts);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed"
    });
  }
});

// PUT/UPDATE post by Id
router.put("/:id", async (req, res) => {
  try {
    const posts = await Posts.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The post information could not be modified."
    });
  }
});

module.exports = router;
