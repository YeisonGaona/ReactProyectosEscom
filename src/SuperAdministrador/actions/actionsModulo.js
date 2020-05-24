import axios from 'axios';
import { desencriptar } from '../componentes/general/Encriptar.js';
import { campo } from '../utilitario/GenerarInputs.js'
import { URL_BASE } from '../utilitario/Configuracion.js';
import {
    mensajeCambiarEstadoDeActividades,
    mensajeDeRegistro,
    mensajeDeCambiarEstado,
    mensajeDeEditar,
    mensajeDeInformacion,
    mensajeDeListar,
    mensajeDeListarActividades
} from '../mensajesDeError/MensajesDeErrorModulo'

export const MOSTRAR_MODULOS = 'MOSTRAR_USUARIOS';
export const ESTADO_MODULOS = 'ESTADO_MODULOS';
export const ANADIR_CODIGO_EDITAR = 'ANADIR_CODIGO_EDITAR';

export const INFORMACION_MODULO = 'INFORMACION_MODULO';
export const MENSAJE_EDITAR_MODULO = 'MENSAJE_EDITAR_MODULO';
export const MENSAJE_SUSPENDER_MODULO = 'MENSAJE_SUSPENDER_MODULO';
export const MENSAJE_ACTIVIDADES = 'MENSAJE_ACTIVIDADES';
export const ACTIVIDADES_MODULO = 'ACTIVIDADES_MODULO';
export const ACTUALIZAR_MODULOS = 'ACTUALIZAR_MODULOS';
export const AGREGAR_MODULO = 'AGREGAR_MODULO';
export const MENSAJE_REGISTRAR_MODULO = 'MENSAJE_REGISTRAR_MODULO';

const PERMISO_REGISTRAR_MODULOS = 'SA_Registrar modulos';
const PERMISO_CONSULTAR_MODULOS = 'SA_Consultar modulos registrados';
const PERMISO_EDITAR_MODULOS = 'SA_Editar informacion de los modulos';
const PERMISO_SUSPENDER_ACTIVAR_ACTIVIDADES = 'SA_Suspender/activar actividades de modulos';
const PERMISO_SUSPENDER_ACTIVAR_MODULOS = 'SA_Suspender/activar modulos';

export function actionAgregarModulo(modulo, token) {
    var tokenRequest = desencriptar(token);
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'TokenAuto': tokenRequest,
        'Permiso': PERMISO_REGISTRAR_MODULOS
    }
    modulo.datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_REGISTRAR_MODULOS
    }
    return (dispatch, getState) => {
        axios.post(`${URL_BASE}/proyectosESCOM-web/api/modulos/registrar`, modulo, { headers: headers })
            .then(response => {
                dispatch({
                    type: AGREGAR_MODULO,
                    moduloARegistrar: modulo
                });
                dispatch({
                    type: MENSAJE_REGISTRAR_MODULO,
                    mensaje: 'modulo registrado'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_REGISTRAR_MODULO,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeRegistro(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_REGISTRAR_MODULO,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_REGISTRAR_MODULO,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    }
}



export function actionConsultarModulos(token) {
    var tokenRequest = desencriptar(token);
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': tokenRequest,
        'Permiso': PERMISO_CONSULTAR_MODULOS
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/modulos/listar`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MOSTRAR_MODULOS,
                    respuesta: response.data
                });

            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_SUSPENDER_MODULO,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeListar(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: ESTADO_MODULOS,
                                    estado: true
                                });
                            } else {
                                dispatch({
                                    type: MENSAJE_SUSPENDER_MODULO,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_SUSPENDER_MODULO,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}

export function actionCargarInformacionDeModulo(codigoModulo, token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_EDITAR_MODULOS
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/modulos/datos/${codigoModulo}`, { headers: headers })
            .then(response => {
                let info = {
                    'descripcionModulo': response.data.descripcionModulo,
                    'estadoModulo': response.data.estadoModulo,
                    'idModulo': response.data.idModulo,
                    'imagenModulo': campo(response.data.imagenModulo),
                    'nombreModulo': response.data.nombreModulo,
                    'url': response.data.url.replace('/', '')
                }
                dispatch({
                    type: INFORMACION_MODULO,
                    informacionModulo: info
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_EDITAR_MODULO,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeInformacion(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_EDITAR_MODULO,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_EDITAR_MODULO,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}

export function actionConsultarActividadesModulo(codigoModulo, token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_SUSPENDER_ACTIVAR_ACTIVIDADES
    }

    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/modulos/listarActividades/${codigoModulo}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: ACTIVIDADES_MODULO,
                    actividades: response.data
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_ACTIVIDADES,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeListarActividades(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_ACTIVIDADES,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_ACTIVIDADES,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}

export function actionSuspenderActivarModulo(codigoModulo, token, actualizados) {
    var tokenRequest = desencriptar(token);
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': tokenRequest,
        'Permiso': PERMISO_SUSPENDER_ACTIVAR_MODULOS
    }
    let datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_SUSPENDER_ACTIVAR_MODULOS
    }
    return (dispatch, getState) => {
        axios.put(`${URL_BASE}/proyectosESCOM-web/api/modulos/cambiarEstado/${codigoModulo}`, datosSolicitud, { headers: headers })
            .then(response => {
                dispatch({
                    type: ACTUALIZAR_MODULOS,
                    modulo: actualizados
                });
                dispatch({
                    type: MENSAJE_SUSPENDER_MODULO,
                    mensaje: 'Operacion hecha con exito'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_SUSPENDER_MODULO,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeCambiarEstado(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_SUSPENDER_MODULO,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_SUSPENDER_MODULO,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }

            });

    }
}

export function actionCambiarEstadoActividades(actividades, token) {
    var tokenRequest = desencriptar(token);
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': tokenRequest,
        'Permiso': PERMISO_SUSPENDER_ACTIVAR_ACTIVIDADES
    }
    actividades[0].datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_SUSPENDER_ACTIVAR_ACTIVIDADES
    }
    return (dispatch, getState) => {
        axios.put(`${URL_BASE}/proyectosESCOM-web/api/modulos/cambiarEstadoActividad/`, actividades, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_ACTIVIDADES,
                    mensaje: 'Operacion hecha con exito'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_ACTIVIDADES,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeCambiarEstadoDeActividades(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_ACTIVIDADES,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_ACTIVIDADES,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    }
}



export function actionEditarModulo(modulo, codigoModulo, token) {
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_EDITAR_MODULOS
    }
    modulo.datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_EDITAR_MODULOS
    }
    return (dispatch, getState) => {
        axios.put(`${URL_BASE}/proyectosESCOM-web/api/modulos/editar/${codigoModulo}`, modulo, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_EDITAR_MODULO,
                    mensaje: 'modulo editado'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_EDITAR_MODULO,
                            mensaje: 'Sin acceso al servicio'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeEditar(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_EDITAR_MODULO,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_EDITAR_MODULO,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    }
}

export function actualizarMensajeSuspenderModulo(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_SUSPENDER_MODULO,
            mensaje: mensaje
        });
    };
}

export function actualizarMensajeActividades(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_ACTIVIDADES,
            mensaje: mensaje
        });
    };
}

export function actionAsignarCodigoModulo(codigoModulo) {
    return (dispatch, getState) => {
        dispatch({
            type: ANADIR_CODIGO_EDITAR,
            codigo: codigoModulo
        });
    }
}
export function actionAsignarModulo(info) {
    return (dispatch, getState) => {
        dispatch({
            type: INFORMACION_MODULO,
            informacionModulo: info
        });
    }
}
export function actualizarMensajeEditar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_EDITAR_MODULO,
            mensaje: mensaje
        });
    };
}


export function actualizarMensajeRegistrar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_REGISTRAR_MODULO,
            mensaje: mensaje
        });
    };
}