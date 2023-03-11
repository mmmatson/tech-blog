const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, (req, res) => {
    Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id,
    })
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

router.put('/:id', withAuth, async (req, res) => {
    const postData = await Post.update(
      {
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedPost) => {
        res.status(200).json(updatedPost);
      })
      .catch((err) => res.status(500).json(err));
  });

  router.delete('/delete/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedPost) => {
        res.json(deletedPost);
      })
      .catch((err) => res.json(err));
  });

module.exports = router;