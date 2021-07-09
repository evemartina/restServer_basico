const { response, request } = require("express");

const esAdminRol = (req= request,res=response,next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere validar el rol sin validar el token primero'
        })
    }

    const {rol,nombre}= req.usuario;
    if(rol!=='ADMIN_ROL'){
        return res.status(500).json({
            msg:`El usuario ${nombre} no tiene rol de Administrador --no puede hacer esto `
        })
    }

    next();
    
}
const tieneRol = (...roles)=>{
    return (req= request,res=response,next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg:'Se quiere validar el rol sin validar el token primero'
            })
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(500).json({
                msg:`EL servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }

}

module.exports ={
    esAdminRol,
    tieneRol
}