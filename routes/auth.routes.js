const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validateFilds } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateFilds
], login);

router.post('/google', [
  check('id_token', 'google id token is required').not().isEmpty(),
  validateFilds
], googleSignIn);

module.exports = router;