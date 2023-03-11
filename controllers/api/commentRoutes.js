const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, (req, res) => {
    Comment.create({
      comment_content: req.body.comment_content,
      user_id: req.session.user_id,
    })
      .then((comment) => {
        res.status(200).json(comment);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

module.exports = router;