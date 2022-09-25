const { response, request } = require("express");
const {Categoria}           = require('../models')

const crearCategoria    = async (req = request,res = response)=>{
    const nombre      = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre})

    console.log(req.usuario)
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);
    await categoria.save();

     res.status(200).json(categoria);
}

const obntenerCategoria = async (req = request,res = response)=>{
    const {limite = 5,desde =0} = req.query;
    const [total,categoria]     = await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true})
        .populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({               
        total,
        categoria
    }) 


}
const obtenerCategoriaId = async (req = request,res = response)=>{
    const {id}        = req.params;
    const categoriaDB = await Categoria.findById(id)
        .populate('usuario','nombre');
    res.json(categoriaDB);

}


const actualizarCategoria = async (req = request,res = response)=>{
    const {id}                     = req.params;
    const {estado,usuario,...data} = req.body;
          data.nombre              = data.nombre.toUpperCase();
          data.usuario             = req.usuario._id;

   res.json(await Categoria.findByIdAndUpdate(id,data,{new:true}));


}


const BorrarCategoria = async (req = request,res = response)=>{
    const {id} = req.params;
   res.json(await Categoria.findByIdAndUpdate(id,{estado:false},{new:true}));


}



module.exports = {
    crearCategoria,
    actualizarCategoria,
    obntenerCategoria,
    obtenerCategoriaId,
    BorrarCategoria
}