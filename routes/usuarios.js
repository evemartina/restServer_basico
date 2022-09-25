const {Router}                                              = require('express');
const { check }                                             = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost,
     usuariosDelete, usuariosPatch }                        = require('../controllers/usuarios');
const { esRoleValido,emailExiste ,existeUrsuarioId}         = require('../helpers/db-validators');
const {validarCampos, validarJWT, esAdminRol, tieneRol}     = require('../middlewares');
const router                                                = Router();

router.get('/', usuariosGet)

router.put('/:id',[
    check('id','No es una id valida').isMongoId(),
    check('id').custom(existeUrsuarioId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut);

router.post('/',[
    check('correo').custom(emailExiste),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 letras').isLength({min:6}),
    // check('rol','El rol no es valido').isIn(['ADMIN_ROL','USER_ROL']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROL','VENTAS_ROL'),
    check('id','No es una id valida').isMongoId(),
    check('id').custom(existeUrsuarioId),
    validarCampos
],usuariosDelete);

router.patch('/',usuariosPatch);

module.exports = router;