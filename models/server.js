const express = require('express');
const cors = require('cors')
const app = express()

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/authPath',
            buscar: '/api/buscar',
            categorias:'/api/categorias',
            productos:'/api/productos',
            usuarios:'/api/usuarios',
            uploads: '/api/uploads'
        }

        //Conectar a base de datos
        this.conectarDB();

        //Midlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        
        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        this.app.use(express.static('public'));    

    }

    routes(){
        this.app.use(this.paths.auth,require('../routes/auth'))
        this.app.use(this.paths.buscar,require('../routes/auth'))
        this.app.use(this.paths.categorias,require('../routes/categorias'))
        this.app.use(this.paths.productos,require('../routes/productos'))
        this.app.use(this.paths.usuarios,require('../routes/usuarios'))
        this.app.use(this.paths.uploads,require('../routes/uploads'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor Corriendo en el puerto ${process.env.PORT}`)
        });
    }

}

module.exports = Server;