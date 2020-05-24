export function encriptarContrasena(contrasena) {
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(contrasena, salt);
    return hash;
}

export function validarContrasena(contrasena,hash) {
    var bcrypt = require('bcryptjs');
    var validacion;
    validacion=bcrypt.compareSync(contrasena, hash);
    return validacion;
}