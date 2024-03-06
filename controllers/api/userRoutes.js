const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Login
router.post('/login', async (req, res) => {
  try {
    console.log
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect Email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or Password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//Create new user
router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
  
      // TODO: Set up sessions with the 'loggedIn' variable
      req.session.save(() => {
        // TODO: Set the 'loggedIn' session variable to 'true'
        req.session.loggedIn = true;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.post('/newPost', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({ where: { id: req.session.user_id } })

        const postData = req.body;
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            creator_name: userData.username,
            creator_id: userData.id,
        });
        console.log(userData.id);
        console.log(req.body);
        res.status(200).json(newPost)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
