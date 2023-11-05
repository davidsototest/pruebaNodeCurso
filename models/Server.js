
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //llamar la funcion para conectar a DB
        this.conectarDB();

        //middlewares
        this.middlewares();
        //rutas de mi aplicacion

        //llamar al doc donde estan todas las rutas
        this.routes();
    }

    //metodo para conectar a la base de datos. 
    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //lectura y parseo del body json
        this.app.use( express.json() );
    
        //directorio publico. 
        this.app.use(express.static('public'));
    };

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server;