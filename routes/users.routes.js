const { Router } = require('express');
const { check } = require('express-validator');
const { validateFilds } = require('../middlewares/validate-fields');
const {
  isRoleValidate,
  isEmailValidate,
  isUserIdValidate
} = require('../helpers/db-validators');

const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers
} = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password is required and must be min lenght 6').isLength(6),
  check('email', 'Invalid email').isEmail(),
  check('email').custom( (email) => isEmailValidate(email) ),
  // check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( (role) => isRoleValidate(role) ),
  validateFilds
] ,postUsers);

router.put('/:user_id', [
  check('user_id', 'Invalid user id').isMongoId(),
  check('user_id').custom( isUserIdValidate ),
  check('role').custom( (role) => isRoleValidate(role) ),
  validateFilds
], putUsers);

router.delete('/:user_id', [
  check('user_id', 'Invalid user id').isMongoId(),
  check('user_id').custom( isUserIdValidate ),
  validateFilds
], deleteUsers);

module.exports = router; 