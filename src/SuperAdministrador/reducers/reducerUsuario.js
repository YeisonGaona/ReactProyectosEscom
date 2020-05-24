
import {
    ACTIVIDADES_SIN_ASIGNAR,
    ACTUALIZAR_USUARIOS,
    AGREGAR_USUARIO,
    ANADIR_CEDULA_EDITAR,
    EDITAR_USUARIO,
    EMAIL_USUARIO,
    ESTADO_ASIGNAR,
    ESTADO_USUARIOS,
    INFORMACION_USUARIO,
    MENSAJE_ASIGNAR,
    MENSAJE_CERRAR_SESION,
    MENSAJE_CONTRASENA,
    MENSAJE_EDITAR,
    MENSAJE_INICIO,
    MENSAJE_LOGIN,
    MENSAJE_REGISTRAR,
    MENSAJE_SUSPENDER,
    MENSAJE_CONTRASENA_EXTERNA,
    MODULOS_ACCESO,
    MODULOS_REGISTRADOS,
    MOSTRAR_ACTIVIDADES_USUARIO,
    MOSTRAR_DOCUMENTOS,
    MOSTRAR_USUARIOS,
    NOMBRE_USUARIO,
    CANTIDAD_USUARIOS
} from '../actions/actionsUsuario.js'


const initialState = {
    actividadesSinAsignar: [],
    actividadesUsuario: [],
    cedula: [],
    emailUsuario: [],
    estadoAsignar: false,
    estadoUsuarios: false,
    mensajeAsignar: '',
    mensajeCerrarSesion: '',
    mensajeContrasena: '',
    mensajeEditar: '',
    mensajeLogin: '',
    mensajeRegistrar: '',
    mensajeSuspender: '',
    mensajeInicio: '',
    mensajeContrasenaExterna: '',
    modulosAcceso: [],
    modulosAsignar: [],
    nombreUsuario: [],
    redireccionLogin: [],
    tiposDocumento: [],
    usuarioEditar: [],
    usuariosRegistrados: [],
    cantidad: 0
}


export function reducerUsuario(state = initialState, action) {
    switch (action.type) {
        case MODULOS_REGISTRADOS:
            return Object.assign({}, state, { modulosAsignar: action.respuesta })
        case EMAIL_USUARIO:
            return Object.assign({}, state, { emailUsuario: action.email })
        case MODULOS_ACCESO:
            return Object.assign({}, state, { modulosAcceso: action.respuesta })
        case MOSTRAR_USUARIOS:
            return Object.assign({}, state, { usuariosRegistrados: action.respuesta })
        case ACTIVIDADES_SIN_ASIGNAR:
            return Object.assign({}, state, { actividadesSinAsignar: action.respuesta })
        case MOSTRAR_ACTIVIDADES_USUARIO:
            return Object.assign({}, state, { actividadesUsuario: action.respuesta })
        case CANTIDAD_USUARIOS:
            return Object.assign({}, state, { cantidad: action.respuesta })
        case AGREGAR_USUARIO:
            return {
                ...state,
                usuariosRegistrados: state.usuariosRegistrados.concat(action.usuarioARegistrar)
            }
        case MENSAJE_CONTRASENA:
            return Object.assign({}, state, { mensajeContrasena: action.mensaje })
        case MENSAJE_CONTRASENA_EXTERNA:
            return Object.assign({}, state, { mensajeContrasenaExterna: action.mensaje })
        case MENSAJE_INICIO:
            return Object.assign({}, state, { mensajeInicio: action.mensaje })
        case MENSAJE_REGISTRAR:
            return Object.assign({}, state, { mensajeRegistrar: action.mensaje })
        case MENSAJE_EDITAR:
            return Object.assign({}, state, { mensajeEditar: action.mensaje })
        case MENSAJE_SUSPENDER:
            return Object.assign({}, state, { mensajeSuspender: action.mensaje })
        case MENSAJE_ASIGNAR:
            return Object.assign({}, state, { mensajeAsignar: action.mensaje })
        case MENSAJE_CERRAR_SESION:
            return Object.assign({}, state, { mensajeCerrarSesion: action.mensaje })
        case INFORMACION_USUARIO:
            return Object.assign({}, state, { usuarioEditar: action.informacionUsuario })
        case ANADIR_CEDULA_EDITAR:
            return Object.assign({}, state, { cedula: action.cedula })
        case EDITAR_USUARIO:
            return Object.assign({}, state, { usuarioEditar: action.payload })
        case ACTUALIZAR_USUARIOS:
            return Object.assign({}, state, { usuariosRegistrados: action.usuario })
        case MENSAJE_LOGIN:
            return Object.assign({}, state, { mensajeLogin: action.mensaje })
        case MOSTRAR_DOCUMENTOS:
            return Object.assign({}, state, { tiposDocumento: action.respuesta })
        case ESTADO_USUARIOS:
            return Object.assign({}, state, { estadoUsuarios: action.estado })
        case ESTADO_ASIGNAR:
            return Object.assign({}, state, { estadoAsignar: action.estado })
        case NOMBRE_USUARIO:
            return Object.assign({}, state, { nombreUsuario: action.nombre })
        default:
            return state
    }
}

