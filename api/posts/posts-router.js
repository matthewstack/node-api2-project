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

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Posts.insert({ title, contents })
      .then(({ id }) => {
        return Posts.findById(id);
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { title, contents } = req.body;

//   try {
//     if (!title || !contents) {
//       res
//         .status(400)
//         .json({ message: "Please provide title and contents for the post" });
//     } else {
//       const updatedPost = await Posts.update(id, { title, contents });

//       if (!updatedPost) {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist" });
//       } else {
//         res.status(200).json(updatedPost);
//       }
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "The post information could not be modified" });
//   }
// });

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Posts.findById(id)
      .then((post) => {
        if (!post) {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        } else {
          return Posts.update(id, req.body);
        }
      })
      .then(() => {
        return Posts.findById(id);
      })
      .then((post) => {
        res.json(post);
      })

      .catch((err) => {
        res
          .status(500)
          .json({ message: "The post information could not be modified" });
      });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removedPost = await Posts.findById(id);
    if (!removedPost) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      await Posts.remove(id);
      res.json(removedPost);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The post information could not be modified" });
  }
});

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    const foundPost = await Posts.findById(id);
    if (!foundPost) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      const findComments = await Posts.findPostComments(id);

      res.json(findComments);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The comments information could not be retrieved" });
  }
});

module.exports = router;
