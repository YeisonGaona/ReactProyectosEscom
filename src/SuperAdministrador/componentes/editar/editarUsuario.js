import React from 'react';


//componentes
import Barra from '../general/BarraDirecciones.js'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import { generarInput, generarSelect, generarDate, generarInputCorreo } from '../../utilitario/GenerarInputs.js'
import { formatoFecha } from '../../utilitario/MensajesError.js'
import { nombre, requerido, seleccione, apellido, fechaNacimiento, validacionCuarentaCaracteres, validacionCincuentaCaracteres, documentoIdentificacion } from '../../utilitario/validacionCampos.js';

//iconos
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
//redux
import { actionCargarInformacionDeUsuario, actionEditarUsuario, actionAsignarCedula, actualizarMensajeEditar, actionConsultarDocumentos, actionConsultarActividadesUsuario, actionActualizarUsuarios } from '../../actions/actionsUsuario.js'
import { connect } from "react-redux";
import { reduxForm, Field } from 'redux-form';


class editar extends React.Component {

  state = {
    habilitado: false,
    cambioDocumento: null
  }

  clickAceptar() {
    this.props.history.goBack();
  }

  componentDidUpdate() {
    if (this.props.mensajeEditar !== '') {
      switch (this.props.mensajeEditar) {
        case 'Ocurrio un error en el servidor':
          NotificationManager.error('Ocurrio un error en el servidor');
          break;
        case 'No se encontraron datos del usuario':
          NotificationManager.error('No se encontraron datos del usuario');
          break;
        case 'Sin permiso':
          if (!this.state.habilitado) { this.setState({ habilitado: true }) };
          break;
        case 'Servidor fuera de servicio temporalmente':
          NotificationManager.error('Servidor fuera de servicio temporalmente');
          break;
        case 'Modificado':
          this.props.history.goBack();
          NotificationManager.success('Informacion actualizada');
          // if (this.state.cambioDocumento === null) {
          //   this.props.actionCargarInformacionDeUsuario(this.props.cedula, localStorage.getItem('Token'));
          // } else {
          //   this.props.actionAsignarCedula(this.state.cambioDocumento);
          //   this.props.actionCargarInformacionDeUsuario(this.state.cambioDocumento, localStorage.getItem('Token'));
          // }
          this.props.actualizarMensajeEditar('');
          break;
        case 'El correo o numero de documento ya esta registrado':
          this.props.actionCargarInformacionDeUsuario(this.props.cedula, localStorage.getItem('Token'));
          NotificationManager.error('El correo o numero de identificacion ya estan registrados');
          if (this.state.cambioDocumento !== null) {
            this.setState({ cambioDocumento: null })
          }
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
    this.props.actualizarMensajeEditar('');
  }

  componentDidMount() {
    if (this.props.cedula === undefined || this.props.cedula.length === 0) {
      this.props.history.goBack();
    } else {
      this.props.actionCargarInformacionDeUsuario(this.props.cedula, localStorage.getItem('Token'));
      this.props.actionConsultarDocumentos(localStorage.getItem('Token'));
    }
  }

  onClickCancelar = (event) => {
    event.preventDefault();
    this.props.history.push('/adminUsuario');
  }

  handleSubmit = formValues => {
    let date = new Date(formValues.fechaNacimiento);
    let usuario = {
      id: 0,
      correoElectronico: formValues.correo,
      numeroDocumento: formValues.numeroDocumento,
      nombre: formValues.nombre,
      apellido: formValues.apellido,
      fechaNacimiento: formatoFecha(date),
      tipoDocumento: formValues.tipoDocumento,
      token: '',
      datosSolicitud: null
    }
    if (formValues.numeroDocumento !== this.props.cedula) {
      this.setState({ cambioDocumento: formValues.numeroDocumento })
    }
    this.props.actionEditarUsuario(usuario, this.props.cedula, localStorage.getItem('Token'));
  }

  render() {

    return (
      <div>
        <div className="text-left titulo letra" style={estiloLetrero}>
          <h4>Editar usuario</h4>
        </div>
        <Barra texto="Inicio > Administracion de usuarios > Editar usuario" />
        <div className="container col-sm-12" style={{
          paddingTop: "7px",
          paddingRight: "44px",
          paddingLeft: "40px",
          paddingBottom: "20px",
          margin: "0px 0px 32px"
        }}>
          <div className="container shadow col-sm-12" style={
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
                    No tiene permisos suficientes para editar la informacion de los usuarios</Alert>
                  <div style={{ padding: "25px 44px 25px 395px" }}>
                    <Button style={{ background: this.props.configuracion.botones, fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" onClick={this.onClickCancelar} startIcon={<DoneOutlineIcon />} type="submit">Aceptar</Button>{''}
                  </div>
                </div> :
                  <form className="letra" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                    <br />

                    <div className="row">
                      <div className="col-sm-6">

                        <Field name="nombre" validate={[requerido, nombre, validacionCuarentaCaracteres]} component={generarInput} label="Nombre" />
                      </div>
                      <div className="col-sm-6">

                        <Field name="apellido" validate={[requerido, apellido, validacionCuarentaCaracteres]} component={generarInput} label="Apellido" />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Tipo de documento</label>
                        <Field name="tipoDocumento" validate={[seleccione]} style={{ height: "35px", fontSize: "13px" }} className="form-control" component={generarSelect} label="Username">
                          <option className="letra" style={{ height: "35px", fontSize: "13px" }} value="0">Seleccione</option>
                          {this.props.documentos.map(documento => <option key={documento.idTipoDocumento} className="letra" style={{ height: "35px", fontSize: "13px" }} value={documento.idTipoDocumento}>{documento.tipoDocumento}</option>)}
                        </Field>
                      </div>
                      <div className="col-sm-6">

                        <Field name="numeroDocumento" type="number" validate={[requerido, documentoIdentificacion]} component={generarInput} label="Numero de documento" />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-sm-6">
                        <Field name="correo" validate={[requerido, validacionCincuentaCaracteres]} type="email" component={generarInputCorreo} label="Correo electronico" />
                      </div>
                      <div className="col-sm-6">
                        <Field name="fechaNacimiento" type="date" validate={[requerido, fechaNacimiento]} component={generarDate} label="Fecha de nacimiento" />
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
    cedula: state.user.cedula,
    configuracion: state.conf.configuracion,
    mensajeEditar: state.user.mensajeEditar,
    usuarios: state.user.usuariosRegistrados,
    documentos: state.user.tiposDocumento,
    actividadesUsuario: state.user.actividadesUsuario,
    initialValues: {
      nombre: state.user.usuarioEditar.nombre,
      apellido: state.user.usuarioEditar.apellido,
      numeroDocumento: state.user.usuarioEditar.numeroDocumento,
      correo: state.user.usuarioEditar.correoElectronico,
      tipoDocumento: state.user.usuarioEditar.tipoDocumento,
      fechaNacimiento: state.user.usuarioEditar.fechaDeNacimiento
    }
  }
}



let formularioEditar = reduxForm({
  form: 'editarUsuario',
  enableReinitialize: true
})(editar)

export default withRouter(connect(mapStateToProps, { actionCargarInformacionDeUsuario, actionAsignarCedula, actualizarMensajeEditar, actionEditarUsuario, actionActualizarUsuarios, actionConsultarDocumentos, actionConsultarActividadesUsuario })(formularioEditar));

