const validateJWT   = require('../middlewares/validate-jwt');
const validateFilds = require('../middlewares/validate-fields');
const validateRoles = require('../middlewares/validate-role');

// operador spread
module.exports = {
  ...validateJWT,
  ...validateFilds,
  ...validateRoles
}