import React from 'react';

import 'react-notifications/lib/notifications.css';

//componentes
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Button from '@material-ui/core/Button';
import Select from 'react-select'
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { seleccione } from '../../utilitario/validacionCampos.js';
import MaterialTable from 'material-table';
import Barra from '../general/BarraDirecciones.js';

import Divider from '@material-ui/core/Divider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

//componentes

//redux
import { actionConsultarModulos, actionConsultarActividadesSinAsignar,actionAsignarCedula, actionEliminarActividades, actualizarMensajeAsignar, actionAsignarActividades, actionConsultarActividadesUsuario, actionAsignarActividad } from '../../actions/actionsUsuario.js'
import { connect } from 'react-redux';


class AsignarActividadUsuario extends React.Component {

    state = {
        selectedOption: 0,
        valor: null,
        actividadesSeleccionadas: []
    }

    componentDidMount() {
        this.props.actionAsignarActividades();
        if (this.props.cedula === undefined || this.props.cedula.length === 0) {
            this.props.history.push('/adminUsuario');
        }else{
            this.props.actionConsultarModulos(localStorage.getItem('Token'));
            this.props.actionConsultarActividadesUsuario(this.props.cedula, localStorage.getItem('Token'));
        }
    }


    componentDidUpdate() {
        if (this.props.mensaje !== '') {
            switch (this.props.mensaje) {
                case 'Actividad asignada':
                    NotificationManager.success('Actividad asignada');
                    this.setState({ valor: null });
                    this.props.actualizarMensajeAsignar('');
                    this.props.actionConsultarActividadesUsuario(this.props.cedula, localStorage.getItem('Token'));
                    this.props.actionConsultarActividadesSinAsignar(localStorage.getItem('Token'), this.props.cedula, this.state.selectedOption.value);
                    break;
                case 'Actividades eliminadas':
                    NotificationManager.success('Actividades eliminadas');
                    this.props.actualizarMensajeAsignar('');
                    this.props.actionConsultarActividadesUsuario(this.props.cedula, localStorage.getItem('Token'));
                    if (this.state.selectedOption.value !== undefined) {
                        this.props.actionConsultarActividadesSinAsignar(localStorage.getItem('Token'), this.props.cedula, this.state.selectedOption.value);
                    }
                    break;
                case 'No se encontraron datos de modulos':
                    NotificationManager.error('No se encontraron datos de modulos');
                    this.props.actualizarMensajeAsignar('');
                    break;
                case 'Ocurrio un error en el servidor':
                    NotificationManager.error('Ocurrio un error en el servidor');
                    this.props.actualizarMensajeAsignar('');

                    break;
                case 'Servidor fuera de servicio temporalmente':
                    NotificationManager.error('Servidor fuera de servicio temporalmente');
                    this.props.actualizarMensajeAsignar('');

                    break;
                case 'Ocurrio un error al momento de asignar actividad al usuario':
                    NotificationManager.error('Ocurrio un error al momento de asignar actividad al usuario');
                    this.props.actualizarMensajeAsignar('');

                    break;
                case 'Token requerido':
                    localStorage.removeItem('Token');
                    window.location.href = "/";
                    break;
                case 'token vencido':
                    localStorage.removeItem('Token');
                    window.location.href = "/";
                    break;
                case 'token no registrado':
                    localStorage.removeItem('Token');
                    window.location.href = "/";
                    break;
                case 'token incorrecto':
                    localStorage.removeItem('Token');
                    window.location.href = "/";
                    break;
                default:
                    break;
            }
        }

    }

    opciones = () => {
        let respuesta = [];
        this.props.modulos.forEach(
            modulo => {
                let objeto = {
                    label: modulo.nombreModulo,
                    value: modulo.idModulo,
                }
                respuesta.push(objeto);
            }
        )
        return respuesta;
    }

    actividades = () => {
        let respuesta = [];
        if (this.props.actividadesSinAsignar !== null && this.props.actividadesSinAsignar !== undefined) {
            this.props.actividadesSinAsignar.forEach(
                actividad => {
                    let objeto = {
                        label: actividad.nombre,
                        value: actividad.idActividad,
                    }
                    respuesta.push(objeto);
                }
            )
            return respuesta;
        } else {
            return null;
        }
    }

    retornarValor = () => {
        return this.state.valor;
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption: selectedOption });
        this.setState({ valor: null });
        this.props.actionConsultarActividadesSinAsignar(localStorage.getItem('Token'), this.props.cedula, selectedOption.value);
    };

    handleChangeDos = selectedOption => {
        this.setState({ valor: selectedOption });
    };

    onClickCancelar = (event) => {
        this.props.actionAsignarCedula([]);
        event.preventDefault();
        this.props.history.goBack();
    }

    handleSubmit = formValues => {
        if (this.state.valor !== null) {
            let actividad = {
                idActividad: this.state.valor.value,
                nombre: this.state.valor.label
            }
            this.setState({ valor: null });
            this.props.actionAsignarActividad(localStorage.getItem('Token'), this.props.cedula, actividad);
        }
    }
    render() {
        return (
            <>
                <div className="text-left titulo" style={estiloLetrero}>
                    <h4>Administrar actividades del usuario</h4>
                </div>
                <Barra texto="Inicio > Administracion de usuarios > Administracion de actividades del usuario" />
                <div className="container col-sm-12" style={{
                    paddingTop: "7px",
                    paddingRight: "44px",
                    paddingLeft: "40px",
                    paddingBottom: "20px",
                    margin: "0px 0px 32px"

                }}>

                    <div className="container shadow" style={
                        {
                            background: "white",
                            paddingTop: "37px",
                            paddingRight: "31px",
                            paddingLeft: "31px",
                            paddingBottom: "21px"
                        }} >
                        {
                            this.props.habilitado ? <div className="col-sm-12">
                                <Alert severity="error" variant="outlined">
                                    <AlertTitle>Sin permiso</AlertTitle>
                                    No tiene permisos suficientes para administrar las actividades de los usuarios
                                </Alert>
                                <div style={{ padding: "25px 44px 25px 395px" }}>
                                    <Button style={{ background: this.props.configuracion.botones, fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" onClick={this.onClickCancelar} startIcon={<DoneOutlineIcon />} type="submit">Aceptar</Button>{''}
                                </div>
                            </div> :
                                <>
                                    <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                                        <br />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Field name="modulo" validate={[seleccione]} onChange={this.handleChange} component={ReduxFormSelect} options={this.opciones()} />
                                            </div>
                                            <div className="col-md-6">
                                                <Field name="actividad" validate={[seleccione]} valor={this.retornarValor()} onChange={this.handleChangeDos} component={ReduxFormSelectDos} options={this.actividades()} />
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="row">
                                            <div className="col-md-6" style={{ paddingLeft: "350px" }}>
                                                <Button
                                                    style={{ background: this.props.configuracion.botones, fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }}
                                                    className="btn btn-dark"
                                                    type="submit"
                                                    variant="contained"
                                                    startIcon={<AddCircleOutlineIcon />}
                                                >Añadir</Button>
                                            </div>
                                            <div className="col-md-6" style={{ paddingLeft: "39px" }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    className="btn btn-dark"
                                                    style={fondoBotonCancelar}
                                                    onClick={this.onClickCancelar}
                                                    startIcon={<CancelIcon />}
                                                >Salir</Button>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <Divider variant="middle" />
                                        <br />
                                    </form>
                                    <div>
                                        <MaterialTable
                                            title="Actividades actualmente asignadas al usuario"
                                            localization={{
                                                header: {
                                                    actions: ' '
                                                },
                                                pagination: {
                                                    nextTooltip: 'Siguiente ',
                                                    previousTooltip: 'Anterior',
                                                    labelDisplayedRows: '{from}-{to} de {count}',
                                                    lastTooltip: 'Ultima pagina',
                                                    firstTooltip: 'Primera pagina',
                                                    labelRowsSelect: 'Registros',
                                                    firstAriaLabel: 'oooo'
                                                },
                                                body: {
                                                    emptyDataSourceMessage: 'Ningun registro de actividad encontrado'
                                                },
                                                toolbar: {
                                                    searchTooltip: 'Buscar',
                                                    searchPlaceholder: 'Buscar',
                                                    nRowsSelected: '{0} actividades seleccionadas',
                                                }
                                            }}
                                            columns={[
                                                { title: 'Nombre de la actividad', field: 'nombre', headerStyle: estiloCabecera, cellStyle: estiloFila },
                                                { title: 'Modulo', field: 'moduloActividad', headerStyle: estiloCabecera, cellStyle: estiloFila }
                                            ]}
                                            data={this.props.actividades}
                                            options={{
                                                search: true,
                                                rowStyle: estiloFila,
                                                selection: true
                                            }}
                                            onSelectionChange={(rows) => {
                                                this.setState({ actividadesSeleccionadas: rows });
                                            }}
                                            actions={[
                                                {
                                                    tooltip: 'Eliminar actividades seleccionadas',
                                                    icon: 'delete',
                                                    onClick: (evt, data) => this.props.actionEliminarActividades(this.state.actividadesSeleccionadas, localStorage.getItem('Token'), this.props.cedula)
                                                }
                                            ]}
                                        />
                                    </div>
                                </>
                        }
                        <br />
                    </div>
                </div>
                <NotificationContainer />
            </>

        )
    }
}

export const ReduxFormSelect = props => {
    const { input, options } = props;
    const { touched, error } = props.meta;
    return (
        <>
            <Select
                {...input}
                styles={customStyles}
                maxMenuHeight={185}
                isSearchable={true}
                placeholder='Seleccione un modulo'
                onChange={value => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                noOptionsMessage={() => 'Aun no hay ningun modulo registrado'}
                options={options}
            />
            {touched && ((error && <span className="text-danger letra form-group">{error}</span>))}
        </>
    )
}

export const ReduxFormSelectDos = props => {
    const { input, options } = props;
    const { touched, error } = props.meta;
    return (
        <div>
            <Select
                {...input}
                styles={customStyles}
                maxMenuHeight={185}
                isSearchable={true}
                value={props.valor}
                placeholder='Seleccione una actividad'
                onChange={value => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                options={options}
                noOptionsMessage={() => 'No hay ninguna actividad que mostrar'}
            />
            {touched && ((error && <span className="text-danger letra form-group">{error}</span>))}
        </div>
    )
}

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: 13
    }),
    control: styles => ({ ...styles, backgroundColor: 'white', fontSize: 13, fontFamily: 'sans-serif' }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, opacity, transition };
    }
}

const estiloCabecera = {
    fontSize: '14px',
    fontFamily: 'sans-serif',
    padding: '8px',
    background: '#e7ecf1'

}

const estiloFila = {
    fontSize: '13px',
    fontFamily: 'sans-serif',
    padding: '8px',
}

const fondoBotonCancelar = {
    background: "gray",
    fontSize: "14px",
    fontFamily: "sans-serif",
    textTransform: "none"
}


const estiloLetrero = {
    paddingTop: "20px",
    paddingRight: "12px",
    paddingLeft: "40px",
    paddingBottom: "1px"
}



function mapStateToProps(state) {
    return {
        modulos: state.user.modulosAsignar,
        mensaje: state.user.mensajeAsignar,
        habilitado: state.user.estadoAsignar,
        cedula: state.user.cedula,
        actividades: state.user.actividadesUsuario,
        actividadesSinAsignar: state.user.actividadesSinAsignar,
        configuracion: state.conf.configuracion
    }
}

let asignarActividadUsuario = reduxForm({
    form: 'asignarActividadUsuario'
})(AsignarActividadUsuario)

export default withRouter(connect(mapStateToProps, { actionConsultarModulos,actionAsignarCedula, actionEliminarActividades, actionConsultarActividadesSinAsignar, actualizarMensajeAsignar, actionAsignarActividad, actionAsignarActividades, actionConsultarActividadesUsuario })(asignarActividadUsuario));
