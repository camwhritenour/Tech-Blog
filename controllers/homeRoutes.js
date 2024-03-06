const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dashboard', async (req, res) => {
    try {
//        const userdata = await User.findOne({
//            where: {
//                id: req.session.user_id,
//            },
//            include: [
//                {
//                    model: Post,
//                },
//            ],
//        });
        // const posts = userPosts.map((post) => post.get({ plain: true }));
//        const user = userdata.get({plain: true})
//        console.log(user)
        res.render('dashboard');
    } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/newPost', async (req, res) => {
    try {
        res.render('newPost');
    } catch (err) {
        res.status(500).json(err);
      }
});



module.exports = router;
