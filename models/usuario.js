
const {Schema, model} = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, "el nombre es requerido"]
    },
    correo: {
        type: String,
        require: [true, "el correo es requerido"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "la contrasena es requerida"]
    },
    img: {
        type: String,
    },
    rol:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

module.exports = model('Usuario', UsuarioSchema);