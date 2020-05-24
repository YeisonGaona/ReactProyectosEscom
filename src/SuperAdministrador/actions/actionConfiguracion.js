import axios from 'axios';
import { desencriptar } from '../componentes/general/Encriptar.js';
import { mensajesFiltro } from '../mensajesDeError/MensajeDeErrorFiltro.js';
import { mensajeDeCargar, mensajeDeRegistro } from '../mensajesDeError/MensajesDeErrorConfiguracion.js';
import { URL_BASE } from '../utilitario/Configuracion.js';

export const ESTADO_CONFIGURACION = 'ESTADO_CONFIGURACION';
export const MOSTRAR_CONFIGURACION = 'MOSTRAR_CONFIGURACION'
export const ACTUALIZAR_BARRALATERAL = 'ACTUALIZAR_BARRALATERAL'
export const ACTUALIZAR_BARRASUPERIOR = 'ACTUALIZAR_BARRASUPERIOR'
export const ACTUALIZAR_FOTO_LOGIN = 'ACTUALIZAR_FOTO_LOGIN'
export const ACTUALIZAR_FOTO_LOGO = 'ACTUALIZAR_FOTO_LOGO'
export const ACTUALIZAR_BOTONES = 'ACTUALIZAR_BOTONES';
export const MENSAJE_CONFIGURACION = 'MENSAJE_CONFIGURACION';
export const CARGAR_CONFIGURACION = 'CARGAR_CONFIGURACION';
export const CONFIGURACION_LOGIN = 'CONFIGURACION_LOGIN';

const PERMISO_CONFIGURACION = 'SA_Administrar configuracion de aspecto';

export function actionActualizarConfiguracion(configuracion, token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONFIGURACION
    }
    configuracion.datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_CONFIGURACION
    }
    return (dispatch, getState) => {
        axios.put(`${URL_BASE}/proyectosESCOM-web/api/configuracion/editarConfiguracion`, configuracion, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_CONFIGURACION,
                    mensaje: 'Configuracion actualizada'
                });
                dispatch({
                    type: CARGAR_CONFIGURACION,
                    configuracion: configuracion
                });

            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_CONFIGURACION,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeRegistro(o.respuesta);
                            dispatch({
                                type: MENSAJE_CONFIGURACION,
                                mensaje: respuesta
                            });

                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_CONFIGURACION,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    }
}

export function consultarConfiguracion(token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token)
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/configuracion/listarEntorno`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MOSTRAR_CONFIGURACION,
                    configuracion: response.data[0]
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MOSTRAR_CONFIGURACION,
                            configuracion: {
                                barraLateral: "#164D14",
                                barraSuperior: "white",
                                botones: "#164D14"
                            }
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesFiltro(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MOSTRAR_CONFIGURACION,
                                    configuracion: {
                                        barraLateral: "#164D14",
                                        barraSuperior: "#FFFFFF",
                                        botones: "#164D14"
                                    }
                                });
                            } else {
                                dispatch({
                                    type: MOSTRAR_CONFIGURACION,
                                    configuracion: {
                                        barraLateral: "#164D14",
                                        fondoSuperior: "#FFFFFF",
                                        botones: "#164D14"
                                    }
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MOSTRAR_CONFIGURACION,
                        configuracion: {
                            barraLateral: "#164D14",
                            fondoSuperior: "#FFFFFF",
                            botones: "#164D14"
                        }
                    });
                }
            });
    }
}

export function consultarConfiguracionLogin() {
    const headers = {
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/configuracion/listarInicio`, { headers: headers })
            .then(response => {
                dispatch({
                    type: CONFIGURACION_LOGIN,
                    configuracion: response.data[0]
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: CONFIGURACION_LOGIN,
                            configuracion: {
                                botones: "#0E3D38",
                                imagenLogin: undefined
                            }
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesFiltro(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: CONFIGURACION_LOGIN,
                                    configuracion: {
                                        botones: "#0E3D38",
                                        imagenLogin: undefined
                                    }
                                });
                            } else {
                                dispatch({
                                    type: CONFIGURACION_LOGIN,
                                    configuracion: {
                                        botones: "#0E3D38",
                                        imagenLogin: undefined
                                    }
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: CONFIGURACION_LOGIN,
                        configuracion: {
                            botones: "#0E3D38",
                            imagenLogin: undefined
                        }
                    });
                }
            });
    }
}

export function actionConsultarConfiguracionCompleta(token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONFIGURACION
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/configuracion/listarCompleta`, { headers: headers })
            .then(response => {
                dispatch({
                    type: CARGAR_CONFIGURACION,
                    configuracion: response.data[0]
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_CONFIGURACION,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeCargar(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: ESTADO_CONFIGURACION,
                                    estado: true
                                });
                            } else {
                                dispatch({
                                    type: MENSAJE_CONFIGURACION,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_CONFIGURACION,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    }
}

export function actionActualizarBarraLateral(color) {
    return (dispatch, getState) => {
        dispatch({
            type: ACTUALIZAR_BARRALATERAL,
            color: color
        });
    }
}


export function actualizarMensaje(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_CONFIGURACION,
            mensaje: mensaje
        });
    };
}

export function actionActualizarBarraSuperior(color) {
    return (dispatch, getState) => {
        dispatch({
            type: ACTUALIZAR_BARRASUPERIOR,
            color: color
        });
    }
}

export function actualizarFotoLogin(foto) {
    return (dispatch, getState) => {
        dispatch({
            type: ACTUALIZAR_FOTO_LOGIN,
            fotoLogin: foto
        });
    }
}

export function actualizarFotoLogo(foto) {
    return (dispatch, getState) => {
        dispatch({
            type: ACTUALIZAR_FOTO_LOGO,
            fotoLogo: foto
        });
    }
}

export function actionActualizarBotones(color) {
    return (dispatch, getState) => {
        dispatch({
            type: ACTUALIZAR_BOTONES,
            color: color
        });
    }
}
