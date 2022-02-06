// implement your posts router here
const Posts = require("./posts-model");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const thePosts = await Posts.find();
    res.json(thePosts);
  } catch (err) {
    res.status(500).json({
      message: "The posts information could not be retrieved",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundPost = await Posts.findById(id);
    if (!foundPost) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.json(foundPost);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The post information could not be retrieved" });
  }
});

//   router.post("/", async (req, res) => {
//     try {
//     } catch (err) {}
//   });

module.exports = router;
