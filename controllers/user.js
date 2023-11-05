const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req, res) => {

    //traer todos los datos de la colleccion
    // const usuarios = await Usuario.find({ estado: true });

    //saber cuantos registros tiene nuestra colleccion.{ estado: true } indica que solo lo de estado en true devuelva.
    // const total = await Usuario.countDocuments( { estado: true } );

    //una manera de meter varias PROMESAS AWAIT en una sola:
    const [ total, usuarios ] = await Promise.all([
        Usuario.find({ estado: true }),
        Usuario.find({ estado: true })
    ]);

    res.json({
        total,
        usuarios
    });
    
    //tomar los queryparams de la URL
    // const {q, nombre, apellido = "sin apellido"} = req.query;

    // res.json({
    //     elevacion: true,
    //     msg: "respuesta de API - controlador",
    //     q,
    //     nombre,
    //     apellido
    // });
};

const usuariosPost = async (req, res) => {

    //tomar la data del body
    // const body = req.body;

    //crear un nuevo usser con el modelos creado
    // const usuario = new Usuario( body );

    //guardo le user en db mongo
    // await usuario.save();
   

    //una forma de tomar solo los datos que necesito y ecitar injecciones.
    const { nombre, correo, rol, password } = req.body;

    //validar con el modelo 
    const usuario = new Usuario( {nombre, correo, rol, password} );

    //validar si el correo ya existe
    // const existeEmail = await Usuario.findOne({correo: correo}); // o tambien asi: findOne({correo});
    // if(existeEmail){
    //     return res.status(400).json({
    //         menssage: "El correo ya existe en DataBase"
    //     });
    // };

    //encryptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

     //guardo le user en db mongo
    await usuario.save();

    res.json({
        elevacion: true,
        msg: "respuesta POST - controller",
        usuario
    });
};

const usuariosPut = async(req, res) => {

    //recibir el params que llega en la URL, como /10 ID
    const id = req.params.id;
    const { password, google, correo, ...resto } = req.body;

    if (password) {
        //encriptar la contrasena
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    //con el find by id and update es para buscar y actualizar. 
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: "user update PUT",
        resto
    });
};

const usuariosDelete = async(req, res) => {

    const {id} = req.params; //recibir el ID por la url

    // const usuarioBorrado = await Usuario.findByIdAndDelete(id); //eliminar el dato en su totalidad de DB

    //recomendado es cambiar el estado a False, deshabilitado.
    const deshabilitarUsuario = await Usuario.findByIdAndUpdate(id, { estado: false});

    res.json({
        msg: `El usuario ${deshabilitarUsuario.nombre} ha sido borrado de la base de datos`,
        estado: deshabilitarUsuario.estado
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}





//ejemplos:

// const usuariosGet = (req, res) => {
//     // res.send('hello wold');
//     // res.status(403).json({
//     //     elevacion: true,
//     //     msg: "respuesta de API"
//     // });
//     res.json({
//         elevacion: true,
//         msg: "respuesta de API - controlador"
//     });
// };



//ejemplo de GET EN PAGINACION

//query: usuarios?skip=3&limit=5

// const {limite = 5, desde = 0 } = req.query;
// const usuarios = await Usuario.find()
//     .skip( Number(desde)) //el Number es para parsear desde a numero
//     .limit(Number(limite));