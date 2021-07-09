
const {Router} = require('express');
const { check } = require('express-validator');


const { login, googleSingnin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login', [
    check('correo','el correo es obligatorio').isEmail(),
    check('password','el correo es obligatorio').not().isEmpty(),
    validarCampos
],login)

router.post('/google', [
    check('id_token','el token es obligatorio').not().isEmpty(),
    validarCampos
],googleSingnin)


module.exports = router