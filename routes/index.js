const router = require('express').Router();

const User = require('../models/user.model');
const Message = require('../models/message.model');

router.get('/', (req, res) => {
  res.redirect('/chat');
});

/* GET home page. */
router.get('/register', (req, res, next) => {
  res.render('register');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/chat', async (req, res, next) => {
  if (!req.cookies['chat_login']) return res.redirect('/login?error=true');
  const user = await User.findById(req.cookies['chat_login']);
  const messages = await Message.find().sort({ createdAt: -1 }).limit(5).populate('user');
  res.render('chat', { user, messages })
});


module.exports = router;
