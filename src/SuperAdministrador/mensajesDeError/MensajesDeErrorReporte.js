import { mensajesFiltro } from './MensajeDeErrorFiltro.js';

export const mensajeDeConsulta = respuesta => {
    let filtro = mensajesFiltro(respuesta);
    if (filtro === '') {
        switch (respuesta) {
            case 'Ocurrio un error en el servidor':
                return 'Ocurrio un error en el servidor';
            case 'No se encontraron reportes':
                return respuesta;
            case 'Ocurrio un error al momento de hacer la consulta de bitacora':
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