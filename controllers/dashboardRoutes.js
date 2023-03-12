const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        attributes: ['id', "title", 'post_content', 'user_id', 'date_created'],
        include: {
            model: User,
            attributes: ['username']
        }
    })
        .then((postData) => {
            const postitems = postData.map((postitems) =>
                postitems.get({ plain: true })
            );
            res.render('dashboard', { postitems, logged_in: req.session.logged_in
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'post_content', 'date_created', "user_id"],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });
        const post = postData.get({
            plain: true
        });
        res.render('viewpost', { post, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/addpost', (req, res) => {
    res.render('addpost');
});

router.get('/updatepost/:id', withAuth, (req, res) => {
    res.render('updatepost');
});

module.exports = router;