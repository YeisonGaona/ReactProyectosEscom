import {
    AGREGAR_ACTIVIDAD,
    ESTADO_ACTIVIDADES,
    MOSTRAR_ACTIVIDADES,
    MENSAJE_REGISTRAR,
    MODULOS_REGISTRADOS,
    MENSAJE_SUSPENDER,
    ACTUALIZAR_ACTIVIDADES,
    ANADIR_CODIGO_EDITAR,
    INFORMACION_ACTIVIDAD,
    MENSAJE_EDITAR,
    EDITAR_ACTIVIDAD,
    CANTIDAD_ACTIVIDADES
} from '../actions/actionActividad.js'


const initialState = {
    actividadesRegistradas: [],
    estadoActividades: false,
    mensajeRegistrar: '',
    mensajeSuspender: '',
    modulosActividades: [],
    codigoActividad: [],
    actividadEditar: [],
    mensajeEditar: '',
    cantidad: 0
}


export function reducerActividad(state = initialState, action) {
    switch (action.type) {
        case MODULOS_REGISTRADOS:
            return Object.assign({}, state, { modulosActividades: action.respuesta })
        case MOSTRAR_ACTIVIDADES:
            return Object.assign({}, state, { actividadesRegistradas: action.respuesta })
        case CANTIDAD_ACTIVIDADES:
            return Object.assign({}, state, { cantidad: action.respuesta })
        case AGREGAR_ACTIVIDAD:
            return {
                ...state,
                actividadesRegistradas: state.actividadesRegistradas.concat(action.actividadARegistrar)
            }
        case ACTUALIZAR_ACTIVIDADES:
            return Object.assign({}, state, { actividadesRegistradas: action.actividad })
        case MENSAJE_REGISTRAR:
            return Object.assign({}, state, { mensajeRegistrar: action.mensaje })
        case MENSAJE_EDITAR:
            return Object.assign({}, state, { mensajeEditar: action.mensaje })
        case MENSAJE_SUSPENDER:
            return Object.assign({}, state, { mensajeSuspender: action.mensaje })
        case ESTADO_ACTIVIDADES:
            return Object.assign({}, state, { estadoActividades: action.estado })
        case ANADIR_CODIGO_EDITAR:
            return Object.assign({}, state, { codigoActividad: action.codigo })
        case INFORMACION_ACTIVIDAD:
            return Object.assign({}, state, { actividadEditar: action.informacionActividad })
        case EDITAR_ACTIVIDAD:
            return Object.assign({}, state, { actividadEditar: action.informacionActividad })
        default:
            return state
    }
}

