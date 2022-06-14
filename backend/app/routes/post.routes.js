module.exports = (app) => {
  const posts = require("../controllers/post.controller");

  const router = require("express").Router();

  //Crear nuevo post
  router.post("/", posts.createPost);

  //Get todos los posts
  router.get("/", posts.getAllPosts);

  //Get todos los post published
  router.get("/published", posts.getAllPublishedPosts);

  //Get post especifico mediante id
  router.get("/one/:id", posts.getOnePost);

  //Update post especifico mediante id
  router.put("/:id", posts.updatePost);

  //Delete post especifico mediante id
  router.delete("/:id", posts.deletePost);

  app.use("/api/posts", router);
};