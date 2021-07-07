const express   = require('express');
const cors      = require('cors')
const {dbConnection} = require('../database/config');

class Server{

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;

        this.usuriosPath ='/api/usuarios';
        //conectar db
        this.conectarDB()


        this.middlewares();

        this.routes();
    }

    
    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors())

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuriosPath,require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port,() =>{
            console.log('app corriendo en ',this.port);
        })
    }

}


module.exports = Server;