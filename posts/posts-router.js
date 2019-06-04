const express = require("express");
const router = express.Router();

const Posts = require("../data/db");

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the post"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await Posts.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error adding the post"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The post has been nuked" });
    } else {
      res.status(404).json({ message: "The post could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the post"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const posts = await Posts.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The post could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error updating the post"
    });
  }
});

// add an endpoint that returns all the comments for a hub
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

// add an endpoint for adding new comment to a post
router.post("/:id/comments", async (req, res) => {
  try {
    const comments = await Posts.insertComment(req.body.comment);
    res.status(201).json(comments);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
