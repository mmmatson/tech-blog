const router = require("express").Router();
const { Post , Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get('/', (req, res) => {
  Post.findAll({
          attributes: ['id',
              'title',
              'post_content',
              'created_at'
          ],
          include: [{
                  model: User,
                  attributes: ['username']
              },
              {
                  model: Comment,
                  attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              }
          ]
      })
      .then(postData => res.json(postData.reverse()))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });

});

  router.post('/', withAuth, (req, res) => {
    Post.create({
            title: req.body.title,
            post_content: req.body.content,
            user_id: req.session.user_id
        })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
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

  router.delete('/:id', withAuth, (req, res) => {
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