const express = require('express');
const cors = require('cors')
const app = express()

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios';
        //Midlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){
        
        //Cors
        this.app.use(cors());

        this.app.use(express.static('public'));
        
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor Corriendo en el puerto ${process.env.PORT}`)
        });
    }

}

module.exports = Server;