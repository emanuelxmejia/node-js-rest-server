const { Schema, model } = require('mongoose');

const UserSchema = Schema({

  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }

});

// Sacando el password y la version de la respuesta que me regresa el request
UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject();

  // primero extraimos el id de la respuesta, despues asignamos una nueva
  // propiedad a la respuesta que es "uid" que va a tener el valor del "_id"
  user.uid = _id;

  return user;
}

module.exports = model( 'User', UserSchema );