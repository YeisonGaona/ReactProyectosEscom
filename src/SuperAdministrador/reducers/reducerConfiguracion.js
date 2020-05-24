
import { campo } from '../utilitario/GenerarInputs.js';

import {
    MOSTRAR_CONFIGURACION, CARGAR_CONFIGURACION, MENSAJE_CONFIGURACION,
    ACTUALIZAR_BARRALATERAL, ACTUALIZAR_BARRASUPERIOR, ACTUALIZAR_BOTONES,
    ACTUALIZAR_FOTO_LOGIN, ACTUALIZAR_FOTO_LOGO, ESTADO_CONFIGURACION,
    CONFIGURACION_LOGIN
} from '../actions/actionConfiguracion.js'


const initialState = {
    configuracion: [],
    mensaje: '',
    estadoConfiguracion: false,
    configuracionLogin: []
}

export function reducerConfiguracion(state = initialState, action) {
    switch (action.type) {
        case CARGAR_CONFIGURACION:
            const configuracionCompleta = () => {
                return ({
                    logo: campo(action.configuracion.logo),
                    imagenLogin: campo(action.configuracion.imagenLogin),
                    barraLateral: action.configuracion.barraLateral,
                    barraSuperior: action.configuracion.barraSuperior,
                    botones: action.configuracion.botones
                })
            }
            return Object.assign({}, state, { configuracion: configuracionCompleta() })
        case MENSAJE_CONFIGURACION:
            return Object.assign({}, state, { mensaje: action.mensaje })
        case MOSTRAR_CONFIGURACION:
            const mostrarConfiguracion = () => {
                return ({
                    logo: campo(action.configuracion.logo),
                    barraLateral: action.configuracion.barraLateral,
                    barraSuperior: action.configuracion.barraSuperior,
                    botones: action.configuracion.botones
                })
            }
            return Object.assign({}, state, { configuracion: mostrarConfiguracion() })
        case ACTUALIZAR_BARRALATERAL:
            const actualizaBarraLateral = () => {
                return ({
                    logo: state.configuracion.logo,
                    imagenLogin: state.configuracion.imagenLogin,
                    barraLateral: action.color,
                    barraSuperior: state.configuracion.barraSuperior,
                    botones: state.configuracion.botones
                })
            }
            return Object.assign({}, state, { configuracion: actualizaBarraLateral() })
        case ACTUALIZAR_BARRASUPERIOR:
            const actualizaBarraSuperior = () => {
                return ({
                    logo: state.configuracion.logo,
                    imagenLogin: state.configuracion.imagenLogin,
                    barraLateral: state.configuracion.barraLateral,
                    barraSuperior: action.color,
                    botones: state.configuracion.botones
                })
            }
            return Object.assign({}, state, { configuracion: actualizaBarraSuperior() })
        case ACTUALIZAR_BOTONES:
            const actualizarBotones = () => {
                return ({
                    logo: state.configuracion.logo,
                    imagenLogin: state.configuracion.imagenLogin,
                    barraLateral: state.configuracion.barraLateral,
                    barraSuperior: state.configuracion.barraSuperior,
                    botones: action.color
                })
            }
            return Object.assign({}, state, { configuracion: actualizarBotones() })
        case ACTUALIZAR_FOTO_LOGIN:
            const actualizarFotoLogin = () => {
                return ({
                    logo: state.configuracion.logo,
                    imagenLogin: action.fotoLogin,
                    barraLateral: state.configuracion.barraLateral,
                    barraSuperior: state.configuracion.barraSuperior,
                    botones: state.configuracion.botones
                })
            }
            return Object.assign({}, state, { configuracion: actualizarFotoLogin() })
        case ACTUALIZAR_FOTO_LOGO:
            const actualizarFotoLogo = () => {
                return ({
                    logo: action.fotoLogo,
                    imagenLogin: state.configuracion.imagenLogin,
                    barraLateral: state.configuracion.barraLateral,
                    barraSuperior: state.configuracion.barraSuperior,
                    botones: state.configuracion.botones
                })
            }
            return Object.assign({}, state, { configuracion: actualizarFotoLogo() })
        case ESTADO_CONFIGURACION:
            return Object.assign({}, state, { estadoConfiguracion: action.estado })
        case CONFIGURACION_LOGIN:
            const configuracionLogin = () => {
                return ({
                    imagenLogin: campo(action.configuracion.imagenLogin),
                    botones: action.configuracion.botones
                })
            }
            return Object.assign({}, state, { configuracionLogin: configuracionLogin() })
        default:
            return state
    }
}

