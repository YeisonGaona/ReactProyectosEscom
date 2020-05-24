import { mensajesFiltro } from './MensajeDeErrorFiltro.js';

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

export const mensajesDeErrorGenerarToken = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'Correo electronico no registrado':
                return respuesta;
            case 'El correo esta en formato incorrecto':
                return `El correo asociado a la cuenta tiene formato incorrecto o es inexistente`;
            default:
                break;
        }
    } else {
        return filtro;
    }
};

export const mensajesDeCambiarContrasenaExterna = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'Usuario no registrado':
                return 'El usuario no esta registrado';
            case 'Token en formato incorrecto':
                return 'Ocurrio un problema con la solicitud intentelo de nuevo';
            case 'Token vencido':
                return 'Se vencio el plazo de 24h genere una nueva solicitud';
            case 'No se encontro un correo asociado':
                return respuesta;
            case 'Enlace no valido':
                return 'Este enlace ya no es valido';
            default:
                break;
        }
    } else {
        return filtro;
    }
};

export const mensajesDeValidarToken = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Este enlace ya no es valido';
            case 'Token en formato incorrecto':
                return 'Ocurrio un problema con la solicitud intentelo de nuevo';
            case 'Token vencido':
                return 'Se vencio el plazo de 24h genere una nueva solicitud';
            case 'Enlace no valido':
                return 'Este enlace ya no es valido'
            default:
                break;
        }
    } else {
        return filtro;
    }
};