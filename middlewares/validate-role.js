const { response } = require("express")


const isAdminRole = ( req, res = response, next ) => {

  // checar que exista un token valido
  if ( !req.user ) {
    return res.status(500).json({
      error_message: 'To check the role its necessary a token'
    });
  }

  const { role, name } = req.user;

  if ( role !== 'ADMIN_ROLE' ) {
    return res.status(401).json({
      error_message: `${ name }, is not admin`
    });
  }

  next();

}

const hasRole = ( ...roles ) => {

  // utilizando el operador rest como parametro, no importa cuantos argumentos
  // nos manden, va a agrupar todos en un arreglo
  // si utilizamos '...' en los argumentos, es el operador rest, otro caso es el operador spread

  // retornando una funcion que es el middleware
  return ( req, res = response, next ) => {
    // console.log(roles, req.user.role);

    // checar que exista un token valido
    if ( !req.user ) {
      return res.status(500).json({
        error_message: 'To check the role its necessary a token'
      });
    }

    // checar si el usuario que esta haciendo la peticion tiene uno de los roles
    // que tienen permitido hacer la request
    if ( !roles.includes( req.user.role ) ) {
      return res.status(401).json({
        error_message: `To do this, the user need to have of these roles: ${ roles }`
      });
    }

    next();
  }

}

module.exports = {
  isAdminRole,
  hasRole
}