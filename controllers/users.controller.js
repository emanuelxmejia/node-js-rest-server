const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');


const getUsers = async( req = request, res = response ) => {

  const { limit = 5, from = 0 } = req.query;
  const query = { status: true }

  /* ------------------------------------------------------------------------------------- *
   * Si utilizamos los dos awaits, puede que la respuesta sea más lenta, porque debe de
   * esperar a que se resuelva un y luego la otra, es bloqueante.
   * Para ejecutar ambas promesas de manera simultanea, utlizamos Promise.all, que ademas
   * de hacer que la respuesta sea más rapida, va a ejecutar ambas promesas al mismo tiempo,
   * no importa el orden de como se resuelvan
  ----------------------------------------------------------------------------------------- */

  // --- BAD
  // const users = await User.find(query)
  //   .skip(Number(from))
  //   .limit(Number(limit));

  // const total = await User.countDocuments(query);

  // --- GOOD
  const [ total, users ] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
    .skip(Number(from))
    .limit(Number(limit))
  ]);

  res.json({
    total,
    users
  });

}

const postUsers = async( req, res = response ) => {

  const { name, email, password, role } = req.body;
  const user = new User({
    name,
    email,
    password,
    role
  });

  // Encriptando la password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync( password, salt );

  // Guardar en DB
  await user.save();

  res.json(user);

}

const putUsers = async( req, res = response ) => {

  const user_id = req.params.user_id;

  // Extrayendo lo que no voy a actualizar, todas las demas propiedades van a veni en el operador ...rest
  const { _id, password, google, email, ...rest } = req.body;

  // TODO validar contra base de datos

  if ( password ) {
    // Encriptando la password
    const salt = bcryptjs.genSaltSync(10);
    rest.password = bcryptjs.hashSync( password, salt );
  }

  const user = await User.findByIdAndUpdate( user_id, rest );

  res.json(user);

}

const deleteUsers = async( req, res = response ) => {

  const { user_id } = req.params;

  // fisicamente lo borramos (no recomendado)
  // const user = await User.findByIdAndDelete( user_id );

  // Cambiando el status para simular la eliminacion
  const user = await User.findByIdAndUpdate( user_id, { status: false } )

  res.json({
    user
  });

}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers
}