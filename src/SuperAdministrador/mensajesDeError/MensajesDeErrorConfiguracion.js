import { mensajesFiltro } from './MensajeDeErrorFiltro.js';

export const mensajeDeCargar = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'Ocurrio un error al momento de hacer la consulta':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron datos':
                return respuesta;
            default:
                break;
        }
    } else {
        return filtro;
    }
};

export const mensajeDeRegistro = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'Ocurrio un error al momento de registrar la configuracion':
                return respuesta;
            default:
                break;
        }
    } else {
        return filtro;
    }
};