const express        = require('express');
const cors           = require('cors')
const {dbConnection} = require('../database/config');

class Server{

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.path = {
            auth     : '/api/auth',
            usuarios : '/api/usuarios',
            categoria: '/api/categorias',
            productos:'api/productos'
        }
       
        //conectar db
        this.conectarDB()

        this.middlewares();
        this.routes();
    }

    
    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors())
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.path.auth,require('../routes/auth'));
        this.app.use(this.path.usuarios,require('../routes/usuarios'));
        this.app.use(this.path.categoria,require('../routes/categorias'));
        this.app.use(this.path.productos,require('../routes/productos'));
    }

    listen(){
        this.app.listen(this.port,() =>{
            console.log('app corriendo en ',this.port);
        })
    }

}

module.exports = Server;