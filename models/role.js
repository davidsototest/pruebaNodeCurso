const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, "el Rol es requerido"]
    }
});

module.exports = model('Role', RoleSchema);