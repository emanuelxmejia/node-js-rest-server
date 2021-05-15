const Role = require('../models/role');
const User = require('../models/user');

const isRoleValidate = async(role = '') => {

  const exists_role = await Role.findOne({ role });

  if ( !exists_role ) {
    throw new Error(`Role: '${ role }' is not available in DB`);
  }

}

const isEmailValidate = async( email = '' ) => {

  const email_already_exists = await User.findOne( { email } );

  if ( email_already_exists ) {
    throw new Error(`The email: '${ email }', already exists`);
  }

}

const isUserIdValidate = async( user_id ) => {
  
  const user_exists = await User.findById(user_id);

  if ( !user_exists ) {
    throw new Error(`There is not a user with the id: '${ user_id }'`);
  }

}

module.exports = {
  isRoleValidate,
  isEmailValidate,
  isUserIdValidate
}