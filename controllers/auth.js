const { response, request } = require("express");

const Usuario          = require('../models/usuario');
const bcrypjs          = require('bcrypt-nodejs');
const { generarJWT }   = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/googlr-verify");



const login = async (req = request,res = response)=>{

    const {correo,password} = req.body
    try {

        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / password no son corretos'
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / password no son corretos :estado false'
            });
        }

        const validarPass = bcrypjs.compareSync(password,usuario.password)
        if(!validarPass){
            return res.status(400).json({
                msg: 'Usuario / password no son corretos :password'
            });
        }

        const token = await generarJWT(usuario.id)

        res.json({
           usuario,
            token
        });

    } catch (error) {
        return res.status(500)=json({
            msg: 'Algo salio mal'
        });
    }
   
}

const googleSingnin = async (req = request,res = response)=>{
    console.log(req.body)
    const { id_token } = req.body;
    try {

        const {nombre,correo,img} = await googleVerify(id_token);
        let   usuario             = await Usuario.findOne({correo});
        if(!usuario){
            const data = {
                nombre,
                correo,
                password: 'ss',
                img,
                google: true
            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administador, usuario bloqueado'
            });
        }
        const token = await generarJWT(usuario.id)
            
        res.json({
           usuario,
           token
        })

    } catch (error) {
        res.status(400).json({
            msg: 'token google invalido'
        })
    }




}

module.exports = {
    login,
    googleSingnin
}