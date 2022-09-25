
const { Router } = require('express');
const { check } = require('express-validator');
const {crearCategoria,
    obntenerCategoria,
    obtenerCategoriaId,
    actualizarCategoria,
    BorrarCategoria} = require('../controllers/categorias');
const { existeCategoriaId }                    = require('../helpers/db-validators');
const { validarCampos,validarJWT, esAdminRol } = require('../middlewares');


const router = Router();

router.get('/', obntenerCategoria);

router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos,
    
], obtenerCategoriaId);

router.post('/',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),    
    validarCampos
],crearCategoria);

router.put('/:id', [
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),  
    check('id').custom(existeCategoriaId),
    validarCampos
],actualizarCategoria);

router.delete('/:id',[
    validarJWT,
    check('id','No es un id valido').isMongoId(),
    esAdminRol,
    validarCampos

],BorrarCategoria);


module.exports = router