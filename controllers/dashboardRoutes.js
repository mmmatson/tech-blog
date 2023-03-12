const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//if logged-in render all posts on the dashboard page
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_content', 'date_created'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
            include: {
                model: User,
                attributes: ['username']
            }
        }],
        include: [{
            model: User,
            attributes: ['username'],
        },],
    })
        .then(postData => {
            const posts = postData.map((post) => post.get({
                plain: true
            }));
            res.render('dashboard', {
                posts,
                logged_in: req.session.logged_in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'post_content', 'date_created', "user_id"],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }, {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'date_created', 'post_id', 'user_id'],
                    include: [
                        User
                    ],
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