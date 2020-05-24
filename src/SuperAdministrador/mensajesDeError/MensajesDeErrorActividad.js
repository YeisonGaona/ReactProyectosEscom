import { mensajesFiltro } from './MensajeDeErrorFiltro.js';

export const mensajeDeRegistro = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'La actividad ya se encuentra registrada':
                return respuesta;
            case 'El modulo no se encuentra registrado':
                return respuesta;
            case 'Ocurrio un error al momento de hacer la consulta':
                return 'Ocurrio un error en el servidor';
            case 'No se encontro ningun dato coincidente':
                return 'Ocurrio un error en el servidor';
            default:
                break;
        }
    } else {
        return filtro;
    }
};


export const mensajeDeListar = respuesta => {
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


export const mensajeDeCargar = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos de la actividad':
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


export const mensajeDeEditar = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'Ocurrio un error al momento de hacer la modificacion de la actividad':
                return respuesta;
            case 'La actividad no existe':
                return respuesta;
            default:
                break;
        }
    } else {
        return filtro;
    }
};


export const mensajeDeSuspender = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos de la actividad':
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
