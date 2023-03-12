const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

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
            res.render('homepage', {
                posts,
                logged_in: req.session.logged_in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    }
    res.render('signup');
});

module.exports = router;