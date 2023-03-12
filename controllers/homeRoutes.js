const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'post_content', 'user_id', 'date_created'],
        include: {
            model: User,
            attributes: ['username']
        }
    })
        .then((postData) => {
            const postitems = postData.map((postitems) =>
                postitems.get({ plain: true })
            );
            res.render('homepage', { postitems });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
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