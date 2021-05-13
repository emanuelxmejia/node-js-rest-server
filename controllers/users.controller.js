const { response, request } = require('express');

const getUsers = ( req = request, res = response ) => {

  const { q, name = 'No name', status } = req.query;

  res.json({
    msg: 'get API - Controller',
    q,
    name,
    status
  });
}

const postUsers = ( req, res = response ) => {

  const { name, age } = req.body;

  res.json({
    msg: 'post API - Controller',
    name,
    age,
  });

}

const putUsers = ( req, res = response ) => {

  const user_id = req.params.user_id;

  res.json({
    msg: 'put API - Controller',
    user_id
  });

}

const patchUsers = ( req, res = response ) => {
  res.json({
    msg: 'patch API - Controller'
  });
}

const deleteUsers = ( req, res = response ) => {
  res.json({
    msg: 'delete API - Controller'
  });
}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers
}