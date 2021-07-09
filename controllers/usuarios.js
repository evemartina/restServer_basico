
const {response,request} = require('express');

const Usuario = require('../models/usurio');
const bcrypjs = require('bcrypt-nodejs');

const usuariosGet = async(  req= request,res = response) =>{
    const {limite = 5,desde =0} = req.query;

    const [total,users] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({               
        total,
        users
    }) 
}   

const usuariosPost = async( req= request,res = response) =>{ 
   
    const {nombre,correo,password,rol} = req.body;
    const usuario       = new Usuario({nombre,correo,password,rol});   
    const salt          = bcrypjs.genSaltSync();
    usuario.password    = bcrypjs.hashSync(password,salt);
    usuario.save();
    res.json({               
        msg:'post api - controlador',
        usuario
    }) 
}  

const usuariosPut = async(  req= request,res = response) =>{ 
    const {id }= req.params;
    const {_id,password,google,...resto} = req.body;

    if(password){
        const salt        = bcrypjs.genSaltSync();
        resto.password    = bcrypjs.hashSync(password,salt);
    }
    const usuarioDB =await Usuario.findByIdAndUpdate(id,resto)

    res.json({               
        msg:'put api - controlador',
        usuarioDB
    }) 
}  
const usuariosDelete = async( req,res = response) =>{ 
    const {id}  = req.params
    const uid   = req.uid;
    const usuarioLogin  = req.usuario;
    const   usuario     = await Usuario.findByIdAndUpdate(id,{estado:false})

    res.json({usuario,uid,usuarioLogin}) 
}  
const usuariosPatch = ( req,res = response) =>{ 
    res.json({               
        msg:'patch api - controlador'
    }) 
}  


module.exports ={
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
    usuariosPut
}