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

// router.get("/:id", async (req, res) => {
//     try {
//     } catch (err) {}
//   });

//   router.post("/", async (req, res) => {
//     try {
//     } catch (err) {}
//   });

module.exports = router;
