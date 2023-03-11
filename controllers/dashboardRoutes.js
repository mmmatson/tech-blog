const router = require("express").Router();
const { Post , User , Comment } = require("../models");
const withAuth = require("../utils/auth");

//if logged-in render all posts on the dashboard page
router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'post_content', 'date_created', 'user_id'],
    })
        .then(postData => {
            const posts = postData.map((post) => post.get({ plain: true }));

            res.render("dashboard", { posts });
        })
        .catch(err => {
            console.log(err);
            res.redirect("login");
        });
});

router.get('/post/:id', withAuth, (req, res) => {
    try {
        const postData = Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }, {
                    model: Comment,
                    include: [
                        User
                    ]
                }
            ],
        });
        const post = postData.get({
            plain: true
        });
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


//if logged-in render all posts on the dashboard page
router.get('/addpost', withAuth, (req, res) => {
    res.render('addpost');
});

router.get("/updatepost/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id)
        .then(postData => {
            if (postData) {
                const post = postData.get({ plain: true });

                res.render("updatepost", { post });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;