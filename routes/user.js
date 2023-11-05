

const {Router} = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middleweres/validarCampos');
const { esRoleValido } = require('../helpers/db-validators,js');
const { emailExiste } = require('../helpers/db-validators,js');
const { existeUsuarioPorId } = require('../helpers/db-validators,js');

const router = Router();

// const corsOptions = {
//     origin: 'http://sinurl.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

router.get('/', usuariosGet);

//el primer argumento es ruta: /, el segundo es un middewer [], y el tercero es a donde pide. 
router.post('/', [
    check('nombre', 'El nombre es requerido').not().isEmpty(), //el not de lante le dice "NO" esta vacio?
    check('password', 'La contrasena debe ser mas de 6 digitos').isLength({min: 6}),

    //validar si es un formato de correo valido
    check('correo', 'El correo no es valido').isEmail(),

    //validar si el correo ya existe en DB
    check('correo').custom( (correo) => emailExiste(correo)),

    //un metodo
    //check('rol', 'No es un rol permitido').isIn(["ADMIN_ROLE", "USER_ROLE"]), // esta validacion es contra un array que tenemos aqui en duro

    //validacion contra una coleccion en DB
    //esRoleValido es una funcion que nos permite valida si el role es valido.
    check('rol').custom( (rol) => esRoleValido(rol) ), // una forma mas limpia: custom(esRoleValido)

    //esta es la funcion que validar si hay errores:
    validarCampos
], usuariosPost);

//tiene el :id para identificar el dato que llega en la URL, usuario/10
router.put('/:id', [
    //validar si es un ID de mongo valido
    check('id', 'No es un ID de mongo valido').isMongoId(),

    //validar el el ID esta en nuestra DB
    check('id').custom( (id) => existeUsuarioPorId(id)),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    check('id', 'No es un ID de mongo valido').isMongoId(),
    check('id').custom( (id) => existeUsuarioPorId(id)),
    validarCampos
], usuariosDelete);

module.exports = router;


