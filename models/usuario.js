

const mongoose = require('mongoose');
let   Schema   = mongoose.Schema;

const UsuarioSchema = Schema({
    nombre:{
        type    : String,
        required: [true,'El nombre es obligatorio']
    },
    correo:{
        type    : String,
        required: [true,'El Correo es obligatorio'],
        unique  : true
    },
    password:{
        type    : String,
        required: [true,'El contraseña es obligatorio']
    },
    img:{
        type: String,
    },
    rol:{
        type    : String,
        required: true,
        default : 'USER_ROL',
        emun    : ['ADMIN_ROL','USER_ROL']
    },
    estado:{
        type   : Boolean,
        default: true
    },
    google:{
        type   : Boolean,
        default: false
    }

});


UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject();
          usuario.uid                   = _id
    return usuario;
}

module.exports = mongoose.model('Usuario', UsuarioSchema);