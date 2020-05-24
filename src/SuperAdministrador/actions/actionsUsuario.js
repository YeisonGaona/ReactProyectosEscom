import axios from 'axios';
import { encriptar, desencriptar } from '../componentes/general/Encriptar.js';
import { URL_BASE } from '../utilitario/Configuracion.js';
import {
    mensajesDeErrorModulosAcceso,
    mensajesDeErrorRegistroUsuarios,
    mensajesDeErrorListarUsuarios,
    mensajesDeErrorCambiarEstadoUsuario,
    mensajesDeErrorCargarInformacion,
    mensajesDeErrorEditarUsuario,
    mensajesDeErrorConsultarModulosUsuario,
    mensajesDeErrorConsultarActividadesUsuario,
    mensajesDeErrorAsignarActividad,
    mensajesDeErrorConsultarCorreo,
    mensajesDeErrorGenerarToken,
    mensajesDeErrorCambiarContrasena,
    mensajesDeValidarToken,
    mensajesDeCambiarContrasenaExterna
} from '../mensajesDeError/MensajesDeErrorUsuario.js';

export const ACTIVIDADES_SIN_ASIGNAR = 'ACTIVIDADES_SIN_ASIGNAR';
export const ACTUALIZAR_USUARIOS = 'ACTUALIZAR_USUARIOS';
export const AGREGAR_ACTIVIDAD = 'AGREGAR_ACTIVIDAD';
export const AGREGAR_USUARIO = 'AGREGAR_USUARIO';
export const ANADIR_CEDULA_EDITAR = "ANADIR_CEDULA_EDITAR";
export const EDITAR_USUARIO = "EDITAR_USUARIO";
export const EMAIL_USUARIO = 'EMAIL_USUARIO';
export const ESTADO_ASIGNAR = 'ESTADO_ASIGNAR';
export const ESTADO_USUARIOS = 'ESTADO_USUARIOS';
export const INFORMACION_USUARIO = 'INFORMACION_USUARIO';
export const MENSAJE_ASIGNAR = 'MENSAJE_ASIGNAR';
export const MENSAJE_CERRAR_SESION = 'MENSAJE_CERRAR_SESION';
export const MENSAJE_CONTRASENA = 'MENSAJE_CONTRASENA';
export const MENSAJE_EDITAR = 'MENSAJE_EDITAR';
export const MENSAJE_INICIO = 'MENSAJE_INICIO';
export const MENSAJE_LOGIN = 'MENSAJE_LOGIN';
export const MENSAJE_REGISTRAR = 'MENSAJE_REGISTRAR';
export const MENSAJE_SUSPENDER = 'MENSAJE_SUSPENDER';
export const MENSAJE_CONTRASENA_EXTERNA = 'MENSAJE_CONTRASENA_EXTERNA';
export const MODULOS_ACCESO = 'MODULOS_ACCESO';
export const MODULOS_REGISTRADOS = 'MODULOS_REGISTRADOS';
export const MOSTRAR_ACTIVIDADES_USUARIO = 'MOSTRAR_ACTIVIDADES_USUARIO';
export const MOSTRAR_DOCUMENTOS = 'MOSTRAR_DOCUMENTOS';
export const MOSTRAR_USUARIOS = 'MOSTRAR_USUARIOS';
export const NOMBRE_USUARIO = 'NOMBRE_USUARIO';
export const REDIRECCIONAR_LOGIN = 'REDIRECCIONAR_LOGIN';
export const CANTIDAD_USUARIOS='CANTIDAD_USUARIOS';

const PERMISO_REGISTRAR = 'SA_Registrar usuarios';
const PERMISO_CONSULTAR_USUARIOS = 'SA_Consultar usuarios registrados';
const PERMISO_EDITAR_USUARIOS = 'SA_Editar informacion de los usuarios';
const PERMISO_ASIGNACION_ACTIVIDADES = 'SA_Asignacion de actividades a los usuarios';
const PERMISO_SUSPENDER_ACTIVAR = 'SA_Suspender/activar usuarios';
const PERMISO_CAMBIAR_CONTRASENA = 'SA_Cambiar contrasena';

export function actionLoginUsuario(correo, contrasena, cambiar) {
    var crypto = require('crypto');
    var contrasenaEncryp = crypto.createHmac('sha256', correo).update(contrasena).digest('hex');
    cambiar(true);
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/login/${correo}/${contrasenaEncryp}`)
            .then(response => {
                if (response.status === 200) {
                    var token = encriptar(response.data.token);
                    localStorage.setItem('Token', token);
                    dispatch({
                        type: MENSAJE_LOGIN,
                        mensaje: 'Login correcto'
                    });
                    var nombre = response.data.nombre + ' ' + response.data.apellido;
                    localStorage.setItem('Nombre', nombre);
                    dispatch({
                        type: NOMBRE_USUARIO,
                        nombre: nombre
                    });
                }
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_LOGIN,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                        cambiar(false);
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            cambiar(false);
                            dispatch({
                                type: MENSAJE_LOGIN,
                                mensaje: o.respuesta
                            });
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_LOGIN,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            })
    };
}

export function actionRecuperarContrasena(correo, cambiar) {
    cambiar(true);
    return (dispatch, getState) => {
        axios.post(`${URL_BASE}/proyectosESCOM-web/api/login/recuperarContrasena/${correo}`)
            .then(response => {
                cambiar(false);
                dispatch({
                    type: MENSAJE_LOGIN,
                    mensaje: 'Se enviaron las instrucciones para recuperar la contraseña a su correo'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_LOGIN,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                        cambiar(false);
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesDeErrorGenerarToken(o.respuesta);
                            cambiar(false);
                            dispatch({
                                type: MENSAJE_LOGIN,
                                mensaje: respuesta
                            });
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_LOGIN,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            })
    };
}


export function actionValidarToken(token) {
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/login/validarTokenRecuperarContrasena/${token}`)
            .then(response => {
                dispatch({
                    type: MENSAJE_CONTRASENA_EXTERNA,
                    mensaje: 'Correcto'
                });
                dispatch({
                    type: NOMBRE_USUARIO,
                    nombre: response.data
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_CONTRASENA_EXTERNA,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesDeValidarToken(o.respuesta);
                            dispatch({
                                type: MENSAJE_CONTRASENA_EXTERNA,
                                mensaje: respuesta
                            });
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_CONTRASENA_EXTERNA,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            })
    };
}

export function actionCambiarContrasenaExterna(correo, contrasena, token) {
    var crypto = require('crypto');
    var contrasenaEncryp = crypto.createHmac('sha256', correo).update(contrasena).digest('hex');
    let datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': token,
        'operacion': PERMISO_CAMBIAR_CONTRASENA
    };
    return (dispatch, getState) => {
        axios.put(`${URL_BASE}/proyectosESCOM-web/api/login/cambiarClaveExterna/${contrasenaEncryp}/${token}`, datosSolicitud)
            .then(response => {
                dispatch({
                    type: MENSAJE_CONTRASENA_EXTERNA,
                    mensaje: 'Contraseña actualizada'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_CONTRASENA_EXTERNA,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesDeCambiarContrasenaExterna(o.respuesta);
                            dispatch({
                                type: MENSAJE_CONTRASENA_EXTERNA,
                                mensaje: respuesta
                            });
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_CONTRASENA_EXTERNA,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            })
    };
}

export function actionCerrarSesion(token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token)
    }
    return (dispatch, getState) => {
        axios.delete(`${URL_BASE}/proyectosESCOM-web/api/login/cerrarSesion/${desencriptar(token)}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_CERRAR_SESION,
                    mensaje: 'cerrada'
                });
            }).catch(function (error) {
                dispatch({
                    type: MENSAJE_CERRAR_SESION,
                    mensaje: 'cerrada'
                });
            });
    }
}

export function actionCerrarSesionInicio(token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token)
    }
    return (dispatch, getState) => {
        axios.delete(`${URL_BASE}/proyectosESCOM-web/api/login/cerrarSesion/${desencriptar(token)}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_INICIO,
                    mensaje: 'sesion cerrada'
                });
            }).catch(function (error) {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_INICIO,
                            mensaje: 'sesion cerrada'
                        });
                    } else {
                        dispatch({
                            type: MENSAJE_INICIO,
                            mensaje: 'sesion cerrada'
                        });
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_INICIO,
                        mensaje: 'sesion cerrada'
                    });
                }
            });
    }
}



export function actionConsultarCorreo(token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token)
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/usuarios/devolverCorreo/${desencriptar(token)}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: EMAIL_USUARIO,
                    email: response.data
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_CONTRASENA,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesDeErrorConsultarCorreo(o.respuesta);
                            dispatch({
                                type: MENSAJE_CONTRASENA,
                                mensaje: respuesta
                            });
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_CONTRASENA,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}

export function actionConsultarUsuarios(token,cantidadDatos,paginaActual) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONSULTAR_USUARIOS
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/usuarios/listar/${desencriptar(token)}/${cantidadDatos}/${paginaActual+1}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MOSTRAR_USUARIOS,
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
                            let respuesta = mensajesDeErrorListarUsuarios(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: ESTADO_USUARIOS,
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

export function actionConsultarUsuariosFiltrados(token,palabraBusqueda,cantidadDatos,paginaActual) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONSULTAR_USUARIOS
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/usuarios/filtrar/${desencriptar(token)}/${palabraBusqueda}/${cantidadDatos}/${paginaActual+1}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MOSTRAR_USUARIOS,
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
                            let respuesta = mensajesDeErrorListarUsuarios(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: ESTADO_USUARIOS,
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

export function actionConsultarCentidadUsuariosFiltrados(token,palabraBusqueda) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONSULTAR_USUARIOS
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/usuarios/filtrar/${desencriptar(token)}/${palabraBusqueda}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: CANTIDAD_USUARIOS,
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
                            let respuesta = mensajesDeErrorListarUsuarios(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: MENSAJE_SUSPENDER,
                                    estado: 'Ocurrio un error en el servidor'
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

export function actionConsultarCentidadUsuarios(token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONSULTAR_USUARIOS
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/usuarios/cantidadDatos/${desencriptar(token)}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: CANTIDAD_USUARIOS,
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
                            let respuesta = mensajesDeErrorListarUsuarios(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: MENSAJE_SUSPENDER,
                                    estado: 'Ocurrio un error en el servidor'
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


export function actionCambiarContrasena(clave, correo, token) {
    var crypto = require('crypto');
    let claveObj = {
        'nuevaClave': crypto.createHmac('sha256', correo).update(clave.nuevaClave).digest('hex'),
        'antiguaClave': crypto.createHmac('sha256', correo).update(clave.antiguaClave).digest('hex'),
        'token': desencriptar(token)
    }
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token)
    }
    claveObj.datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_CAMBIAR_CONTRASENA
    };
    return (dispatch, getState) => {
        axios.post(`${URL_BASE}/proyectosESCOM-web/api/usuarios/cambiarClaveInterna`, claveObj, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_CONTRASENA,
                    mensaje: 'Contraseña cambiada'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_CONTRASENA,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesDeErrorCambiarContrasena(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_CONTRASENA,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_CONTRASENA,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    }
}

export function actionConsultarModulosAcceso(token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token)
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/usuarios/redireccion/${desencriptar(token)}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MODULOS_ACCESO,
                    respuesta: response.data
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_INICIO,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesDeErrorModulosAcceso(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_INICIO,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_INICIO,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}

export function actionConsultarActividadesUsuario(numeroDocumento, token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_ASIGNACION_ACTIVIDADES
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/usuarios/listarActividades/${numeroDocumento}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MOSTRAR_ACTIVIDADES_USUARIO,
                    respuesta: response.data
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_ASIGNAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesDeErrorConsultarActividadesUsuario(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_ASIGNAR,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_ASIGNAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}

export function actionConsultarDocumentos(token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_CONSULTAR_USUARIOS
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/usuarios/tipoDocumento`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MOSTRAR_DOCUMENTOS,
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
                        let cedula = {
                            'idTipoDocumento': '1',
                            'tipoDocumento': 'Cedula'
                        }
                        let tarjetaIdentidad = {
                            'idTipoDocumento': '2',
                            'tipoDocumento': 'Tarjeta de identidad'
                        }
                        let documentos = [cedula, tarjetaIdentidad];
                        if (error.request) {
                            dispatch({
                                type: MOSTRAR_DOCUMENTOS,
                                respuesta: documentos
                            });
                        }
                    }
                } catch (error) {
                    let cedula = {
                        'idTipoDocumento': '1',
                        'tipoDocumento': 'Cedula'
                    }
                    let tarjetaIdentidad = {
                        'idTipoDocumento': '2',
                        'tipoDocumento': 'Tarjeta de identidad'
                    }
                    let documentos = [cedula, tarjetaIdentidad];
                    if (error.request) {
                        dispatch({
                            type: MOSTRAR_DOCUMENTOS,
                            respuesta: documentos
                        });
                    }
                }
            });
    };
}

export function actionAsignarIp() {
    return (dispatch, getState) => {
        axios.get("https://api.ipify.org/?format=json")
            .then(response => {
                localStorage.setItem('Ip', response.data.ip)
            }).catch((error) => {
                if (error.request.response === '') {
                    localStorage.setItem('Ip', '127.0.0.1');
                }
            });
    };
}

export function actionAgregarUsuario(usuario, token) {
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_REGISTRAR
    }
    usuario.datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_REGISTRAR
    };
    return (dispatch, getState) => {
        axios.post(`${URL_BASE}/proyectosESCOM-web/api/usuarios/registrar`, usuario, { headers: headers })
            .then(response => {
                dispatch({
                    type: AGREGAR_USUARIO,
                    usuarioARegistrar: usuario
                });
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Usuario registrado'
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
                            let respuesta = mensajesDeErrorRegistroUsuarios(o.respuesta);
                            if (respuesta !== '') {
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

    }
}

export function actionAsignarActividad(token, numeroDocumento, actividad) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_ASIGNACION_ACTIVIDADES
    }
    actividad.datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_ASIGNACION_ACTIVIDADES
    }
    return (dispatch, getState) => {
        axios.post(`${URL_BASE}/proyectosESCOM-web/api/usuarios/asignarActividad/${numeroDocumento}`, actividad, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_ASIGNAR,
                    mensaje: 'Actividad asignada'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_ASIGNAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesDeErrorAsignarActividad(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_ASIGNAR,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_ASIGNAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    }
}

export function actionSuspenderActivarUsuario(cedula, token, actualizados) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_SUSPENDER_ACTIVAR
    }
    let datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_SUSPENDER_ACTIVAR
    };
    return (dispatch, getState) => {
        axios.put(`${URL_BASE}/proyectosESCOM-web/api/usuarios/cambiarEstado/${cedula}`, datosSolicitud, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_SUSPENDER,
                    mensaje: 'Operacion hecha con exito'
                });
                dispatch({
                    type: ACTUALIZAR_USUARIOS,
                    usuario: actualizados
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
                            let respuesta = mensajesDeErrorCambiarEstadoUsuario(o.respuesta);
                            if (respuesta !== '') {
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

    }
}

export function actionCargarInformacionDeUsuario(cedula, token) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_EDITAR_USUARIOS
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/usuarios/datos/${cedula}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: INFORMACION_USUARIO,
                    informacionUsuario: response.data
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
                            let respuesta = mensajesDeErrorCargarInformacion(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_EDITAR,
                                    mensaje: respuesta
                                });
                            }
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

export function actionConsultarModulos(token) {

    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_ASIGNACION_ACTIVIDADES
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
                            type: MENSAJE_ASIGNAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesDeErrorConsultarModulosUsuario(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: ESTADO_ASIGNAR,
                                    estado: true
                                });
                            } else {
                                dispatch({
                                    type: MENSAJE_ASIGNAR,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_ASIGNAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}



export function actionEliminarActividades(actividades, token, numeroDocumento) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_ASIGNACION_ACTIVIDADES
    }
    actividades[0].datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_ASIGNACION_ACTIVIDADES
    }
    return (dispatch, getState) => {
        axios.put(`${URL_BASE}/proyectosESCOM-web/api/usuarios/eliminarActividad/${numeroDocumento}`, actividades, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_ASIGNAR,
                    mensaje: 'Actividades eliminadas'
                });
            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_ASIGNAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesDeErrorConsultarActividadesUsuario(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: MENSAJE_ASIGNAR,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_ASIGNAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    }
}

export function actionConsultarActividadesSinAsignar(token, numeroDocumento, codigoModulo) {
    const headers = {
        'Content-Type': 'application/json',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_ASIGNACION_ACTIVIDADES
    }
    return (dispatch, getState) => {
        axios.get(`${URL_BASE}/proyectosESCOM-web/api/usuarios/listarActividadesNoAsociadas/${numeroDocumento}/${codigoModulo}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: ACTIVIDADES_SIN_ASIGNAR,
                    respuesta: response.data
                });

            }).catch((error) => {
                try {
                    if (error.request.response === '') {
                        dispatch({
                            type: MENSAJE_ASIGNAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    } else {
                        if (error.request) {
                            var o = JSON.parse(error.request.response);
                            let respuesta = mensajesDeErrorConsultarActividadesUsuario(o.respuesta);
                            if (respuesta === 'Sin permiso') {
                                dispatch({
                                    type: ESTADO_ASIGNAR,
                                    estado: true
                                });
                            } else {
                                dispatch({
                                    type: MENSAJE_ASIGNAR,
                                    mensaje: respuesta
                                });
                            }
                        }
                    }
                } catch (error) {
                    dispatch({
                        type: MENSAJE_ASIGNAR,
                        mensaje: 'Ocurrio un error en el servidor'
                    });
                }
            });
    };
}


export function actionEditarUsuario(usuario, cedula, token) {
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'TokenAuto': desencriptar(token),
        'Permiso': PERMISO_EDITAR_USUARIOS
    }
    usuario.datosSolicitud = {
        'ip': localStorage.getItem('Ip'),
        'token': desencriptar(token),
        'operacion': PERMISO_EDITAR_USUARIOS
    };
    return (dispatch, getState) => {
        axios.put(`${URL_BASE}/proyectosESCOM-web/api/usuarios/editar/${cedula}`, usuario, { headers: headers })
            .then(response => {
                dispatch({
                    type: EDITAR_USUARIO,
                    payload: usuario
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
                            let respuesta = mensajesDeErrorEditarUsuario(o.respuesta);
                            if (respuesta !== '') {
                                dispatch({
                                    type: EDITAR_USUARIO,
                                    payload: usuario
                                });
                                dispatch({
                                    type: MENSAJE_EDITAR,
                                    mensaje: respuesta
                                });
                            }
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

export function actualizarMensajeCerrar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_CERRAR_SESION,
            mensaje: mensaje
        });
    };
}

export function actualizarMensajeInicio(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_INICIO,
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

export function actualizarMensajeRecuperarContrasena(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_CONTRASENA_EXTERNA,
            mensaje: mensaje
        });
    };
}

export function actualizarMensajeLogin(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_LOGIN,
            mensaje: mensaje
        });
    };
}

export function actualizarMensajeRegistrar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_REGISTRAR,
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


export function asignarNombreUsuario(nombre) {
    return (dispatch, getState) => {
        dispatch({
            type: NOMBRE_USUARIO,
            nombre: nombre
        });
    };
}

export function actualizarMensajeAsignar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_ASIGNAR,
            mensaje: mensaje
        });
    };
}

export function actualizarMensajeCambiarContrasena(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_CONTRASENA,
            mensaje: mensaje
        });
    };
}

export function actionAsignarCedula(cedula) {
    return (dispatch, getState) => {
        dispatch({
            type: ANADIR_CEDULA_EDITAR,
            cedula: cedula
        });
    }
}

export function actionAsignarActividades() {
    return (dispatch, getState) => {
        dispatch({
            type: ACTIVIDADES_SIN_ASIGNAR,
            respuesta: []
        });
    }
}


export function actionActualizarUsuarios(usuarios) {
    return (dispatch, getState) => {
        dispatch({
            type: ACTUALIZAR_USUARIOS,
            usuario: usuarios
        });
    }
}