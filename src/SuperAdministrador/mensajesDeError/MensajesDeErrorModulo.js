import { mensajesFiltro } from './MensajeDeErrorFiltro.js';

export const mensajeDeRegistro = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'El nombre de modulo ya esta registrado':
                return respuesta;
            case 'La url del modulo ya esta registrada':
                return respuesta;
            case 'Ocurrio un error al momento de hacer el registro de modulo':
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


export const mensajeDeInformacion = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos del modulo':
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
            case 'Ocurrio un error al momento de hacer la modificacion del modulo':
                return respuesta;
            case 'La url o el nombre del modulo ya esta registrada':
                return respuesta;
            case 'El modulo no existe':
                return respuesta;
            default:
                break;
        }
    } else {
        return filtro;
    }
};

export const mensajeDeCambiarEstado = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos del modulo':
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

export const mensajeDeListarActividades = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos del modulo':
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

export const mensajeCambiarEstadoDeActividades = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'Ocurrio un error al momento de hacer la consulta':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos de la actividad':
                return respuesta;
            default:
                break;
        }
    } else {
        return filtro;
    }
};

