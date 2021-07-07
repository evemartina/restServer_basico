const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const RoleSchema = Schema({
    rol:{
        type:String,
        required:[true,'El rol es obligatorio']
    }
});


module.exports = mongoose.model('Role', RoleSchema);
