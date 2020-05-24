import {
    MENSAJE_REPORTE,
    REPORTES,
    CANTIDAD,
    REPORTE_TOTAL
} from '../actions/actionReporte.js'


const initialState = {
    reporte: [],
    mensajeReporte: '',
    cantidad: 0,
    reporteTotal:[]
}

export function reducerReporte(state = initialState, action) {
    switch (action.type) {
        case REPORTES:
            return Object.assign({}, state, { reporte: action.reporte })
        case REPORTE_TOTAL:
            return Object.assign({}, state, { reporteTotal: action.reporte })
        case CANTIDAD:
            return Object.assign({}, state, { cantidad: action.reporte })
        case MENSAJE_REPORTE:
            return Object.assign({}, state, { mensajeReporte: action.mensaje })
        default:
            return state
    }
}
