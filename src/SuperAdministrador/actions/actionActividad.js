import axios from 'axios';
import { desencriptar } from '../componentes/general/Encriptar.js';
import { URL_BASE } from '../utilitario/Configuracion.js';
import {
    mensajeDeEditar,
    mensajeDeCargar,
    mensajeDeListar,
    mensajeDeRegistro,
    mensajeDeSuspender
} from '../mensajesDeError/MensajesDeErrorActividad.js';
import { mensajeDeListar as mensajeDelistarModulos } from '../mensajesDeError/MensajesDeErrorModulo.js';
export const MOSTRAR_ACTIVIDADES = 'MOSTRAR_ACTIVIDADES';
export const ESTADO_ACTIVIDADES = 'ESTADO_ACTIVIDADES';
export const AGREGAR_ACTIVIDAD = 'AGREGAR_ACTIVIDAD';
export const EDITAR_USUARIO = "EDITAR_USUARIO";
export const MENSAJE_REGISTRAR = 'MENSAJE_REGISTRAR';
export const MENSAJE_SUSPENDER = 'MENSAJE_SUSPENDER';
export const MODULOS_REGISTRADOS = 'MODULOS_REGISTRADOS';
export const ACTUALIZAR_ACTIVIDADES = 'ACTUALIZAR_ACTIVIDADES';
export const ANADIR_CODIGO_EDITAR = 'ANADIR_CODIGO_EDITAR';
export const INFORMACION_ACTIVIDAD = 'INFORMACION_ACTIVIDAD';
export const MENSAJE_EDITAR = 'MENSAJE_EDITAR';
export const EDITAR_ACTIVIDAD = 'EDITAR_ACTIVIDAD';
export const CANTIDAD_ACTIVIDADES='CANTIDAD_ACTIVIDADES';


const PERMISO_CONSULTAR_ACTIVIDADES = 'SA_Consultar actividades registradas';
const PERMISO_REGISTRAR_ACTIVIDAD = 'SA_Registrar actividad';
const PERMISO_SUSPENDER_ACTIVAR = 'SA_Suspender/activar actividades'
const PERMISO_EDITAR_ACTIVIDAD = 'SA_Editar informacion de la actividad';


export function actionConsultarActividades(token,cantidadDatos,paginaActual) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONSULTAR_ACTIVIDADES
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/actividades/listar/${cantidadDatos}/${paginaActual+1}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MOSTRAR_ACTIVIDADES,
                    respuesta: response.data
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_SUSPENDER,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeListar(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: ESTADO_ACTIVIDADES,
                                    estado: true
                                });
                            } else {
                                dispatch({
                                    type: MENSAJE_SUSPENDER,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_SUSPENDER,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}

export function actionFiltrarActividades(token,palabraBusqueda,cantidadDatos,paginaActual) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONSULTAR_ACTIVIDADES
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/actividades/filtrar/${palabraBusqueda}/${cantidadDatos}/${paginaActual+1}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MOSTRAR_ACTIVIDADES,
                    respuesta: response.data
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_REGISTRAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeListar(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: ESTADO_ACTIVIDADES,
                                    estado: true
                                });
                            } else {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}

export function actionConsultarCantidadActividades(token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONSULTAR_ACTIVIDADES
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/actividades/cantidad`, { headers: headers })
            .then(response => {
                dispatch({
                    type: CANTIDAD_ACTIVIDADES,
                    respuesta: response.data
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_SUSPENDER,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeListar(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    estado: 'Ocurrio un error en el servidor'
                                });
                            } else {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}

export function actionConsultarCantidadActividadesFiltradas(token,palabraBusqueda) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONSULTAR_ACTIVIDADES
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/actividades/filtrarCantidad/${palabraBusqueda}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: CANTIDAD_ACTIVIDADES,
                    respuesta: response.data
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_REGISTRAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeListar(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    estado: 'Ocurrio un error en el servidor'
                                });
                            } else {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}

export function actionAgregarActividad(actividad, token) {
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_REGISTRAR_ACTIVIDAD
    }
    actividad.datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_REGISTRAR_ACTIVIDAD
    }
    return (dispatch, getState) => {
        axios.post(`${URL_BASE}/proyectosESCOM-web/api/actividades/registrar`, actividad, { headers: headers })
            .then(response => {
                dispatch({
                    type: AGREGAR_ACTIVIDAD,
                    actividadARegistrar: actividad
                });
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'actividad registrada'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_REGISTRAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeRegistro(o.respuesta);
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: respuesta
                            });
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });

    }
}

export function actionConsultarModulos(token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONSULTAR_ACTIVIDADES
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/modulos/listar`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MODULOS_REGISTRADOS,
                    respuesta: response.data
                });

            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_REGISTRAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDelistarModulos(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: ESTADO_ACTIVIDADES,
                                    estado: true
                                });
                            } else {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}

export function actionSuspenderActivarActividad(codigoActividad, token, actualizados) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_SUSPENDER_ACTIVAR
    }
    let datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_SUSPENDER_ACTIVAR
    }
    return (dispatch, getState) => {
        axios.put(`${URL_BASE}/proyectosESCOM-web/api/actividades/cambiarEstado/${codigoActividad}`, datosSolicitud, { headers: headers })
            .then(response => {
                dispatch({
                    type: ACTUALIZAR_ACTIVIDADES,
                    actividad: actualizados
                });
                dispatch({
                    type: MENSAJE_SUSPENDER,
                    mensaje: 'Operacion hecha con exito'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_SUSPENDER,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeSuspender(o.respuesta);
                            dispatch({
                                type: MENSAJE_SUSPENDER,
                                mensaje: respuesta
                            });
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_SUSPENDER,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    }
}


export function actionCargarInformacionDeActividad(codigoActividad, token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_EDITAR_ACTIVIDAD
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/actividades/listarEspecifica/${codigoActividad}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: INFORMACION_ACTIVIDAD,
                    informacionActividad: response.data
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_EDITAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeCargar(o.respuesta);
                            dispatch({
                                type: MENSAJE_EDITAR,
                                mensaje: respuesta
                            });
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_EDITAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}


export function actionEditarUsuario(actividad, token) {
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_EDITAR_ACTIVIDAD
    }
    actividad.datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_EDITAR_ACTIVIDAD
    }
    return (dispatch, getState) => {
        axios.put(`${URL_BASE}/proyectosESCOM-web/api/actividades/editar`, actividad, { headers: headers })
            .then(response => {
                dispatch({
                    type: EDITAR_ACTIVIDAD,
                    informacionActividad: actividad
                });
                dispatch({
                    type: MENSAJE_EDITAR,
                    mensaje: 'Modificado'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_EDITAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajeDeEditar(o.respuesta);
                            dispatch({
                                type: MENSAJE_EDITAR,
                                mensaje: respuesta
                            });
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_EDITAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    }
}



export function actionAsignarCodigoActividad(codigoActividad) {
    return (dispatch, getState) => {
        dispatch({
            type: ANADIR_CODIGO_EDITAR,
            codigo: codigoActividad
        });
    }
}

export function actualizarMensajeRegistrar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_REGISTRAR,
            mensaje: mensaje
        });
    };
}


export function actualizarMensajeEditar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_EDITAR,
            mensaje: mensaje
        });
    };
}


export function actualizarMensajeSuspender(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_SUSPENDER,
            mensaje: mensaje
        });
    };
}