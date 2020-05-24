

export const mensajesDeError = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {

    } else {
        return filtro;
    }
    switch (respuesta) {
        case 'Token requerido':
            return 'Token requerido';
        case 'Sin permiso':
            return 'Sin permiso';
        case 'token vencido':
            return 'Token requerido';
        case 'token no registrado':
            return 'Token requerido';
        case 'token incorrecto':
            return 'Token requerido';
        case 'Ocurrio un error interno del servidor':
            return 'Token requerido';
        default:
            return '';
    }
};

export const mensajesDeErrorModulosAcceso = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'Ocurrio un error al momento de hacer la consulta':
                return 'Ocurrio un error en el servidor';
            case 'No hay permisos asociados':
                return 'No hay permisos asociados';
            case 'sesion cerrada':
                return respuesta;
            default:
                break;
        }
    } else {
        return filtro;
    }
};

export const mensajesDeErrorRegistroUsuarios = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'El correo o numero de documento ya esta registrado':
                return respuesta;
            case 'Ocurrio un error al momento de hacer el registro del usuario':
                return respuesta;
            case 'No se encontro ningun dato coincidente':
                return 'Ocurrio un error en el servidor';
            default:
                break;
        }
    } else {
        return filtro;
    }
};


export const mensajesDeErrorListarUsuarios = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos':
                return respuesta;
            case 'Ocurrio un error al momento de hacer la consulta':
                return 'Ocurrio un error en el servidor';
            default:
                break;
        }
    } else {
        return filtro;
    }
};

export const mensajesDeErrorCambiarEstadoUsuario = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos del usuario':
                return respuesta;
            case 'Ocurrio un error al momento de hacer la consulta':
                return 'Ocurrio un error en el servidor';
            default:
                break;
        }
    } else {
        return filtro;
    }
};

export const mensajesDeErrorCargarInformacion = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos del usuario':
                return respuesta;
            case 'Ocurrio un error al momento de hacer la consulta':
                return 'Ocurrio un error en el servidor';
            default:
                break;
        }
    } else {
        return filtro;
    }
};
export const mensajesDeErrorEditarUsuario = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'El correo o numero de documento ya esta registrado':
                return respuesta;
            case 'Ocurrio un error al momento de hacer la modificacion del usuario':
                return 'Ocurrio un error en el servidor';
            case 'El usuario no existe':
                return 'Ocurrio un error en el servidor';
            default:
                break;
        }
    } else {
        return filtro;
    }
};
export const mensajesDeErrorConsultarModulosUsuario = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos':
                return 'No se encontraron datos de modulos';
            case 'Ocurrio un error al momento de hacer la consulta':
                return 'Ocurrio un error en el servidor';
            default:
                break;
        }
    } else {
        return filtro;
    }
};

export const mensajesDeErrorConsultarActividadesUsuario = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos del usuario':
                return respuesta;
            case 'Error en la consulta':
                return 'Ocurrio un error en el servidor';
            case 'Ocurrio un error al momento de hacer la consulta':
                return 'Ocurrio un error en el servidor';
            default:
                break;
        }
    } else {
        return filtro;
    }
};

export const mensajesDeErrorAsignarActividad = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'Ocurrio un error al momento de asignar actividad al usuario':
                return respuesta;
            case 'No se encontro ningun dato coincidente':
                return 'Ocurrio un error en el servidor';
            default:
                break;
        }
    } else {
        return filtro;
    }
};
export const mensajesDeErrorConsultarCorreo = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontro el usuario':
                return respuesta;
            case 'El usuario no existe':
                return 'Ocurrio un error en el servidor';
            case 'Ocurrio un error al momento de hacer la consulta de usuario':
                return 'Ocurrio un error en el servidor';
            default:
                break;
        }
    } else {
        return filtro;
    }
};
export const mensajesDeErrorCambiarContrasena = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'La contraseña ingresada no es la correcta':
                return respuesta;
            case 'La contraseña nueva no puede ser igual a la antigua':
                return respuesta;
            case 'Ocurrio un error al momento de hacer la consulta':
                return respuesta;
            case 'El usuario no existe':
                return 'Ocurrio un error en el servidor';
            default:
                break;
        }
    } else {
        return filtro;
    }
};


const mensajesFiltro = respuesta => {
    switch (respuesta) {
        case 'Token requerido':
            return 'Token requerido';
        case 'Sin permiso':
            return 'Sin permiso';
        case 'token vencido':
            return 'Token requerido';
        case 'token no registrado':
            return 'Token requerido';
        case 'token incorrecto':
            return 'Token requerido';
        default:
            return '';
    }
}


export const formatoFecha = (fecha) => {
    let fechaRecibida = new Date(fecha);
    let dia = fechaRecibida.getUTCDate();
    let mes = fechaRecibida.getUTCMonth();
    let ano = fechaRecibida.getFullYear();
    return new Date(ano, mes, dia);
}
