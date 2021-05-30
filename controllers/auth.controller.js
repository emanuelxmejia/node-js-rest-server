const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { createJWT } = require('../helpers/create-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { findOne } = require('../models/user');

const login = async( req, res = response ) => {
  const { email, password } = req.body;

  try {
    // verificar si el email existe
    const user = await User.findOne({ email });

    if ( !user ) {
      return res.status(400).json({
        error_message: 'User or password are invalid - password' 
      });
    }
    
    // si el usuario esta activo en la bd
    if ( !user.status ) {
      return res.status(400).json({
        error_message: 'User or password are invalid - user'
      });
    }

    // verificar el password
    // bcryptjs.compareSync compara el password que me llega contra el del usuario en la BD
    const valid_password = bcryptjs.compareSync( password, user.password );

    if (!valid_password) {
      return res.status(400).json({
        error_message: 'User or password are invalid - password'
      });
    }
    
    // generar el JWT
    const token = await createJWT( user.id );

    res.json({
      user,
      token
    })

  } catch (err) {

    console.log(error);
    res.status(500).json({
      error_message: 'Something went wrong'
    });

  }
}

const googleSignIn = async(req, res = response) => {
  const { id_token } = req.body;

  try {
    // const google_user = await googleVerify(id_token);
    // console.log(google_user);
    const { email, name, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      // si no existe el usuario tengo que crearlo
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true
      };

      user = new User(data);
      await user.save();
    }

    // Si el usuario tiene el status en false
    if (!user.status) {
      return res.status(401).json({
        error_message: 'Hable con el administrador, usuario bloqueado'
      });
    }

    // Generar el JWT
    const token = await createJWT(user.id);

    res.json({
      message: 'Google SignIn OK',
      user,
      token
    });
  } catch (err) {
    res.status(400).json({
      error_message: 'Google token invalid'
    });
  }
}

module.exports = {
  login,
  googleSignIn
}