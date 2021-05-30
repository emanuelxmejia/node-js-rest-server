const express = require('express');
const cors = require('cors');
const { connectionDB } = require('../database/config.database');

class Server {

  constructor() {

    this.app = express();
    this.port = process.env.PORT;
    this.users_route_path = '/api/users';
    this.auth_path = '/api/auth';

    // Conectar a la base de datos
    this.connectionToDB();

    // Middlewares
    this.middlewares()

    // Rutas de mi aplicación
    this.routes();

  }

  async connectionToDB() {

    await connectionDB();

  }

  middlewares() {

    // Cors
    this.app.use( cors() );

    // Lectura y parseo del body
    this.app.use( express.json() );

    // Directorio publico
    this.app.use( express.static('public') );

  }

  routes() {

    this.app.use( this.auth_path, require('../routes/auth.routes') );
    this.app.use( this.users_route_path, require('../routes/users.routes') );

  }

  listen() {

    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto: ', this.port);
    });

  }

}

module.exports = Server;