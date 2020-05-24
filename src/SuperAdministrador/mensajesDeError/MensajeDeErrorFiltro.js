export const mensajesFiltro = respuesta => {
    switch (respuesta) {
        case 'Token requerido':
            return 'Token requerido';
        case 'Sin permiso':
            return 'Sin permiso';
        case 'token vencido':
            return 'Token requerido';
        case 'token no registrado':
            return 'Token requerido';
        case 'token incorrecto':
            return 'Token requerido';
        default:
            return '';
    }
}