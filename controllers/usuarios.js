
const {response,request} = require('express');

const usuariosGet = (  req= request,res = response) =>{
    const param = req.query;
    res.json({               
        msg:'get api - controlador'
    }) 
}   

const usuariosPost = ( req= request,res = response) =>{ 
    const {nombre,edad} = req.body;

    res.json({               
        msg:'post api - controlador',
        nombre,
        edad
    }) 
}  
const usuariosPut = (  req= request,res = response) =>{ 
    const id = req.params.id;
    res.json({               
        msg:'put api - controlador',
        id
    }) 
}  
const usuariosDelete = ( req,res = response) =>{ 
    res.json({               
        msg:'delete api - controlador'
    }) 
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