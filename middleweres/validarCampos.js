const { validationResult } = require('express-validator');

//
const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
    //validos si encontro errores:
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    //nos sirve para indicar que continue con la ejecucion de las
    //siguientes funciones desde donde llamemos a validarcampos.
    next();

}

module.exports = {
    validarCampos,
}