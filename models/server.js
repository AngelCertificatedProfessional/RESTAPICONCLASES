const express = require('express');
const app = express()

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        
        //Midlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public'));
    }

    routes(){



        this.app.get('/api', (req, res) => {
            res.json({
                msg:'Get api'
            })
        });

        this.app.put('/api', (req, res) => {
            res.json({
                msg:'put api'
            })
        });

        this.app.post('/api', (req, res) => {
            res.json({
                msg:'post api'
            })
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                msg:'Delete api'
            })
        });
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor Corriendo en el puerto ${process.env.PORT}`)
        });
    }

}

module.exports = Server;