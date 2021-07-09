const { response, request } = require("express");

const Usuario = require('../models/usurio');
const bcrypjs = require('bcrypt-nodejs');
const { generarJWT } = require("../helpers/generarJWT");



const login =async (req=request,res=response)=>{

    const {correo,password} = req.body
    try {

        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / password no son corretos'
            })
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / password no son corretos :estado false'
            })
        }

        const validarPass = bcrypjs.compareSync(password,usuario.password)
        if(!validarPass){
            return res.status(400).json({
                msg:'Usuario / password no son corretos :password'
            })
        }

        const token = await generarJWT(usuario.id)


        res.json({
           usuario,
            token
        });


    } catch (error) {
        return res.status(500)=json({
            msg:'Algo salio mal'
        })
    }



   
}

module.exports ={
    login
}