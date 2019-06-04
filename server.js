const express = require("express");
const postsRouter = require("./posts/posts-router");
const server = express();

server.use(express.json());
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Blog API</h>
    <p>Welcome to the Lambda Blog API</p>
  `);
});

module.exports = server;
