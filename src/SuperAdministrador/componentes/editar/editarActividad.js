import React from 'react';


//componentes
import Barra from '../general/BarraDirecciones.js'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import { generarInput, generarTextArea } from '../../utilitario/GenerarInputs.js'
import { requerido, validacionCuarentaCaracteres, validacionDoscientosCaracteres } from '../../utilitario/validacionCampos.js';

//iconos
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
//redux
import { actionCargarInformacionDeActividad, actionEditarUsuario, actualizarMensajeEditar } from '../../actions/actionActividad.js'
import { connect } from "react-redux";
import { reduxForm, Field } from 'redux-form';


class EditarActividad extends React.Component {

    state = {
        habilitado: false
    }

    clickAceptar() {
        this.props.history.goBack();
    }

    componentDidUpdate() {
        if (this.props.mensajeEditar !== '') {
            switch (this.props.mensajeEditar) {
                case 'Sin permiso':
                    if (!this.state.habilitado) { this.setState({ habilitado: true }) };
                    break;
                case 'Modificado':
                    NotificationManager.success('Informacion actualizada');
                    this.props.history.goBack();
                    // this.props.actionCargarInformacionDeActividad(this.props.codigoActividad, localStorage.getItem('Token'));
                    this.props.actualizarMensajeEditar('');
                    break;
                case 'Ocurrio un error al momento de hacer la modificacion de la actividad':
                    NotificationManager.error('Ocurrio un error al momento de hacer la modificacion de la actividad');
                    this.props.actualizarMensajeEditar('');
                    break;
                case 'No se encontraron datos de la actividad':
                    NotificationManager.error('No se encontro informacion de la actividad');
                    this.props.actualizarMensajeEditar('');
                    break;
                case 'Ocurrio un error en el servidor':
                    NotificationManager.error('Ocurrio un error en el servidor');
                    this.props.actualizarMensajeEditar('');
                    break;
                case 'Servidor fuera de servicio temporalmente':
                    NotificationManager.error('Servidor fuera de servicio temporalmente');
                    this.props.actualizarMensajeEditar('');
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

    componentDidMount() {
        if (this.props.codigoActividad === undefined || this.props.codigoActividad.length === 0) {
            this.props.history.goBack();
        } else {
            this.props.actionCargarInformacionDeActividad(this.props.codigoActividad, localStorage.getItem('Token'));
        }
    }

    onClickCancelar = (event) => {
        event.preventDefault();
        this.props.history.goBack();
    }

    handleSubmit = formValues => {
        let actividad = {
            idActividad: this.props.codigoActividad,
            nombre: formValues.nombre,
            descripcionActividad: formValues.descripcion,
            moduloActividad: formValues.modulo
        }
        this.props.actionEditarUsuario(actividad, localStorage.getItem('Token'));
    }

    render() {

        return (
            <div>
                <div className="text-left titulo letra" style={estiloLetrero}>
                    <h4>Editar actividad</h4>
                </div>
                <Barra texto="Inicio > Administracion de actividades > Editar actividad" />
                <div className="container" style={{
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
                        }}>
                        <div>
                            {
                                this.state.habilitado ? <div className="col-sm-12">
                                    <Alert severity="error" variant="outlined">
                                        <AlertTitle>Sin permiso</AlertTitle>
                                        No tiene permisos suficientes para editar la informacion de las actividades</Alert>
                                    <div style={{ padding: "25px 44px 25px 395px" }}>
                                        <Button style={{ background: this.props.configuracion.botones, fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" onClick={this.onClickCancelar} startIcon={<DoneOutlineIcon />} type="submit">Aceptar</Button>{''}
                                    </div>
                                </div> :
                                    <form className="letra" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <Field name="nombre" disabled={true} validate={[requerido, validacionCuarentaCaracteres]} component={generarInput} label="Nombre" />
                                            </div>
                                            <div className="col-sm-6">
                                                <Field name="modulo" disabled={true} validate={[requerido]} component={generarInput} label="Modulo" />
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <Field name="descripcion" validate={[requerido, validacionDoscientosCaracteres]} filas={4} component={generarTextArea} label="Descripcion" />
                                            </div>
                                        </div>
                                        <br />
                                        <Divider variant="middle" />
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-6" style={{ paddingLeft: "350px" }}>
                                                <Button style={{ background: this.props.configuracion.botones, fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} startIcon={<SaveIcon />} className="btn btn-dark" variant="contained" type="submit">Guardar</Button>{''}
                                            </div>
                                            <div className="col-sm-6">
                                                <Button style={fondoBotonCancelar} variant="contained" className="btn btn-dark" startIcon={<CancelIcon />} onClick={this.onClickCancelar}>Salir</Button>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                    </form>
                            }
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
                <NotificationContainer />
            </div>
        );
    }
}

const estiloLetrero = {
    paddingTop: "20px",
    paddingRight: "12px",
    paddingLeft: "40px",
    paddingBottom: "1px"
}

const fondoBotonCancelar = {
    background: "gray",
    fontSize: "14px",
    fontFamily: "sans-serif",
    textTransform: "none"
}


function mapStateToProps(state) {
    return {
        codigoActividad: state.act.codigoActividad,
        configuracion: state.conf.configuracion,
        mensajeEditar: state.act.mensajeEditar,
        actividadEditar: state.act.actividadEditar,
        initialValues: {
            nombre: state.act.actividadEditar.nombre,
            modulo: state.act.actividadEditar.moduloActividad,
            descripcion: state.act.actividadEditar.descripcionActividad,
        }
    }
}



let formularioEditar = reduxForm({
    form: 'editarActividad',
    enableReinitialize: true
})(EditarActividad)

export default withRouter(connect(mapStateToProps, { actionCargarInformacionDeActividad, actionEditarUsuario, actualizarMensajeEditar })(formularioEditar));

