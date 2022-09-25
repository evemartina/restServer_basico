const mongoose = require('mongoose');
let   Schema   = mongoose.Schema;

const categoriaSchema = Schema({
    nombre:{
        type    : String,
        required: [true,'el nombre es obligatorio'],
        unique  : true
    },
    estado:{
        type    : Boolean,
        default : true,
        required: true
    },
    usuario:{
        type    : Schema.Types.ObjectId,
        ref     : 'Usuario',
        required: true
    }
});

categoriaSchema.methods.toJSON = function(){
    const {__v,estado,_id,...data} = this.toObject();
    return data;
}

module.exports = mongoose.model('Categoria', categoriaSchema);
