import React from 'react';

//estilos
import 'react-notifications/lib/notifications.css';

//componentes
import Button from '@material-ui/core/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { generarInput, generarDate } from '../../utilitario/GenerarInputs.js'
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';
import Select from 'react-select';
import { formatoFecha } from '../../utilitario/MensajesError.js'

//redux
import { actionAgregarUsuario, actionConsultarUsuarios, actionConsultarCentidadUsuarios, actionConsultarDocumentos, actualizarMensajeRegistrar } from '../../actions/actionsUsuario.js'
import { connect } from 'react-redux';
import { fechaNacimiento, seleccione, nombre, apellido, contrasena, documentoIdentificacion, requerido, validacionCincuentaCaracteres, validacionCuarentaCaracteres } from '../../utilitario/validacionCampos.js';

class PopUpUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.props.reset();
  }


  componentDidUpdate() {
    if (this.props.mensaje !== '') {
      switch (this.props.mensaje) {
        case 'Usuario registrado':
          NotificationManager.success('Usuario registrado correctamente');
          this.props.actualizarMensajeRegistrar('');
          this.props.actionConsultarUsuarios(localStorage.getItem('Token'), 5, 0);
          this.props.actionConsultarCentidadUsuarios(localStorage.getItem('Token'));
          break;
        case 'Sin permiso':
          NotificationManager.error('No tiene los permisos suficientes para registrar un usuario');
          this.props.reset();
          this.props.actualizarMensajeRegistrar('');
          break;
        case 'El correo o numero de documento ya esta registrado':
          NotificationManager.error('El correo o numero de identificacion ya estan registrados');
          this.props.reset();
          this.props.actualizarMensajeRegistrar('');
          break;
        case 'Servidor fuera de servicio temporalmente':
          NotificationManager.error('Servidor fuera de servicio temporalmente');
          this.props.reset();
          this.props.actualizarMensajeRegistrar('');
          break;
        case 'Ocurrio un error en el servidor':
          NotificationManager.error('Ocurrio un error en el servidor');
          this.props.actualizarMensajeRegistrar('');
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
    this.props.actualizarMensajeRegistrar('');

  }

  componentWillMount() {
    this.props.actionConsultarDocumentos(localStorage.getItem('Token'));
  }


  handleSubmit = formValues => {
    try {
      var crypto = require('crypto');
      var contrasenaEncryp = crypto.createHmac('sha256', formValues.correo).update(formValues.contrasena).digest('hex');
      let date = new Date(formValues.fechaNacimiento);
      let usuario = {
        'nombre': formValues.nombre,
        'apellido': formValues.apellido,
        'tipoDocumento': formValues.tipoDocumento.value,
        'numeroDocumento': formValues.numeroDocumento,
        'correoElectronico': formValues.correo,
        'contrasena': contrasenaEncryp,
        'fechaNacimiento': formatoFecha(date),
        'estado': 'Activo',
        'datosSolicitud': null
      };
      this.props.actionAgregarUsuario(usuario, localStorage.getItem('Token'));
      this.props.reset();
    } catch (error) {
      NotificationManager.error('Ingrese todos los datos');
    }
  }

  opciones = () => {
    let respuesta = [];
    this.props.documentos.forEach(
      documento => {
        const { idTipoDocumento, tipoDocumento } = documento
        let objeto = {
          label: tipoDocumento,
          value: idTipoDocumento,
        }
        respuesta.push(objeto);
      }
    )
    return respuesta;
  }

  render() {
    return (
      <div>
        <Button style={{ background: this.props.configuracion.botones, fontSize: "14px", textTransform: "none" }} startIcon={<AddIcon />} className="btn btn-dark" variant="contained" onClick={this.toggle}>Registrar usuario</Button>
        <Modal isOpen={this.state.modal}
          toggle={this.toggle}
          style={{ width: "400px" }}>
          <ModalHeader toggle={this.toggle} style={{ height: "50px", width: "400px" }} className="center">Crear usuario</ModalHeader>
          <ModalBody>
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
              <div className="contenedor-inputs">
                <div className="row">
                  <div className="col-sm-12">
                    <Field name="nombre" type="text" validate={[requerido, nombre, validacionCuarentaCaracteres]} component={generarInput} label="Nombre" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <Field name="apellido" type="text" validate={[requerido, apellido, validacionCuarentaCaracteres]} component={generarInput} label="Apellido" />
                  </div>
                </div>

                <div className="row" style={{ paddingTop: '9px' }}>
                  <div className="col-sm-12" style={{ zIndex: '2' }}>
                    <Field name="tipoDocumento" validate={[seleccione]} component={ReduxFormSelect} options={this.opciones()} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <Field name="numeroDocumento" type="number" validate={[requerido, documentoIdentificacion]} component={generarInput} label="Numero de documento" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <Field name="correo" validate={[requerido, validacionCincuentaCaracteres]} type='email' component={generarInput} label="Correo electronico" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <Field name="contrasena" validate={[requerido, contrasena]} type="password" component={generarInput} label="Contraseña" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <Field name="fechaNacimiento" type='date' validate={[requerido, fechaNacimiento]} component={generarDate} label="Fecha de nacimiento" />
                  </div>
                </div>
                <br />
              </div>
              <ModalFooter>
                <Button style={{ background: this.props.configuracion.botones, fontSize: "13px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" startIcon={<SaveAltIcon />} type="submit">Registrar</Button>{''}
                <Button style={fondoBotonCancelar} className="btn btn-dark" variant="contained" startIcon={<CancelIcon />} onClick={this.toggle}>Cancelar</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </Modal>
        <NotificationContainer />
      </div>
    );
  }
}

const ReduxFormSelect = props => {
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
  const { input, options } = props;
  const { touched, error } = props.meta;
  return (
    <>
      <Select
        {...input}

        styles={customStyles}
        isSearchable={false}
        placeholder='Seleccione el tipo de documento'
        onChange={value => input.onChange(value)}
        onBlur={() => input.onBlur(input.value)}
        noOptionsMessage={() => 'No hay tipo de documento registrado'}
        options={options}
      />
      {touched && ((error && <span className="text-danger form-group" style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>{error}</span>))}
    </>
  )
}

const fondoBotonCancelar = {
  background: "gray",
  fontSize: "13px",
  fontFamily: "sans-serif",
  textTransform: "none"
}

function mapStateToProps(state) {
  return {
    users: state.user.list,
    token: state.user.token,
    documentos: state.user.tiposDocumento,
    mensaje: state.user.mensajeRegistrar,
    configuracion: state.conf.configuracion
  }
}

let formulario = reduxForm({
  form: 'registrarUsuario'
})(PopUpUsuario)

export default withRouter(connect(mapStateToProps, { actionAgregarUsuario, actionConsultarUsuarios, actionConsultarCentidadUsuarios, actionConsultarDocumentos, actualizarMensajeRegistrar })(formulario));
