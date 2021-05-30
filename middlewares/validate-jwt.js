const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async( req = request, res = response, next ) => {

  // como lo especifiquemos, es como el frontend lo tiene que enviar
  const token = req.header('x-token');
  // console.log(token);

  if (!token) {
    return res.status(401).json({
      error_message: 'No token provided'
    });
  }

  try {

    const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

    // leer el usuario que corresponde al uid
    const user = await User.findById( uid );

    // checar que el usuario exista en la base de datos
    if ( !user ) {
      return res.status(401).json({
        error_message: 'Token invalid - user not exists in DB'
      })
    }

    // checar si el usuario que esta haciendo la peticion esta activo en la base de datos
    if ( !user.status ) {
      return res.status(401).json({
        error_message: 'Token invalid - user status is false'
      })
    }

    // creando una nueva propiedad en la request con el nombre de uid que tendra el valor del uid del usuario
    req.user = user;

    next();

  } catch (err) {
    console.log(err);

    res.status(401).json({
      error_message: 'Invalid Token'
    });

  }

}

module.exports = {
  validateJWT
}