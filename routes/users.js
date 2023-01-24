const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');

const User = require('../models/user.model');

router.post('/create', async (req, res) => {

  req.body.password = bcrypt.hashSync(req.body.password, 7);
  try {
    await User.create(req.body);
    res.redirect('/login');
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  // Comprueba si el email está en la BD
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.redirect('/login?error=true');

  // Compruebo si las password coinciden
  const iguales = bcrypt.compareSync(req.body.password, user.password);
  if (!iguales) return res.redirect('/login?error=true');

  // Login correcto
  res.cookie('chat_login', user._id);
  res.redirect('/chat');
});

module.exports = router;
