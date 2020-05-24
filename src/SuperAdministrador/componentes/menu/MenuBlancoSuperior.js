import React from 'react';

import 'react-notifications/lib/notifications.css';
//reactstrap
import Button from '@material-ui/core/Button';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import RenderPasword from '../../utilitario/GenerarInputs';
//imagenes
import { requerido ,contrasena} from '../../utilitario/validacionCampos.js';
import { withRouter } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NotificationContainer, NotificationManager } from 'react-notifications';




import { connect } from 'react-redux';
import { consultarConfiguracion } from '../../actions/actionConfiguracion.js'
import { actionCerrarSesion, actualizarMensajeCerrar, actionCambiarContrasena, asignarNombreUsuario, actionConsultarCorreo, actualizarMensajeCambiarContrasena } from '../../actions/actionsUsuario.js'

class BarraSuperior extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};
		this.toggle = this.toggle.bind(this);
	}

	state = {
		amount: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	}

	toggle(event) {
		event.preventDefault();
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
		this.props.actionConsultarCorreo(localStorage.getItem('Token'));
	}

	mensaje = (event) => {
		event.preventDefault();
		var token = localStorage.getItem('Token');
		this.props.actionCerrarSesion(token);
	}

	componentDidMount() {
		this.props.asignarNombreUsuario(localStorage.getItem('Nombre'));
	}

	handleChange = prop => event => {
		this.setState({ ...this.state, [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
		this.setState({ ...this.state, showPassword: !this.state.showPassword });
	};

	handleMouseDownPassword = event => {
		event.preventDefault();
	};

	componentDidUpdate() {
		if (this.props.mensaje !== '') {
			switch (this.props.mensaje) {
				case 'cerrada':
					localStorage.removeItem('Token');
					this.props.history.go('/');
					break;
				default:
					break;
			}
		}
		if (this.props.mensajeCambiar !== '') {
			switch (this.props.mensajeCambiar) {
				case 'Contraseña cambiada':
					NotificationManager.success('Contraseña actualizada');
					this.props.reset();
					break;
				case 'La contraseña nueva no puede ser igual a la antigua':
					NotificationManager.error('La contraseña nueva no puede ser igual a la antigua');
					this.props.reset();
					break;
				case 'La contraseña ingresada no es la correcta':
					NotificationManager.error('La contraseña ingresada no es la correcta');
					this.props.reset();
					break;
				case 'Ocurrio un error al momento de hacer la consulta':
					NotificationManager.error('Ocurrio un error al momento de hacer la consulta');
					break;
				case 'Servidor fuera de servicio temporalmente':
					NotificationManager.error('Servidor fuera de servicio temporalmente');
					break;
				case 'Ocurrio un error en el servidor':
					NotificationManager.error('Ocurrio un error en el servidor');
					break;
				case 'No se encontro el usuario':
					NotificationManager.error('Ocurrio un error ntentelo de nuevo mas tarde');
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
		this.props.actualizarMensajeCerrar('');
		this.props.actualizarMensajeCambiarContrasena('');
	}

	fondobotoon = () => {
		return (this.props.configuracion.barraSuperior === undefined ?
			{
				background: 'white',
				height: "48px",
				padding: ".1rem"
			} : {
				background: this.props.configuracion.barraSuperior,
				height: "48px",
				padding: ".1rem"
			})
	}
	fondoPerfil = () => {
		return (this.props.configuracion.barraSuperior === undefined ?
			{
				background: 'white',
				height: "48px",
				padding: ".5rem"
			} : {
				background: this.props.configuracion.barraSuperior,
				height: "48px",
				padding: ".5rem"
			})
	}

	handleSubmitForm = values => {
		if (values.nuevaContrasena !== values.verificacionNueva) {
			NotificationManager.warning('Las contraseñas no coinciden');
		} else {
			let clave = {
				'nuevaClave': values.nuevaContrasena,
				'antiguaClave': values.contrasenaActual
			}
			this.props.actionCambiarContrasena(clave, this.props.emailUsuario, localStorage.getItem('Token'));
		}
	}
	render() {
		return (
			<div>
				<div>
					<div className="jumbotron p-1 jumbotron-fluid shadow" style={{ background: this.props.configuracion.barraSuperior,overflow:'hidden',position:'fixed', width:'100%',zIndex:'13' }} >
						<nav className="navbar navbar-expand" style={this.fondoPerfil()}>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav ml-auto mt-2 mt-lg-1 ">
									<div className="col-sm-12 text-right">
										<li className="" width="250px" style={{ display: "inline-block", verticalAlign: ".255em" }}>
											<UncontrolledPopover trigger="focus" style={{ textTransform: "none", width: "250px" }} placement="bottom" target="PopoverFocus">
												<PopoverBody className="shadow" style={{ width: "250px" }}>
													<Button id="cambiarContra" style={botones} startIcon={<VpnKeyIcon />} onClick={this.toggle} >Cambiar contraseña</Button>
													<br />
													<Button id="cerrarSesion" onClick={this.mensaje} startIcon={<ExitToAppIcon />} style={botones}>Cerrar sesion</Button>
												</PopoverBody>
											</UncontrolledPopover>

											{/* <img src={persona} alt="" width="30" height="30" /> */}

											<Button id="PopoverFocus" startIcon={<AccountCircleIcon style={{ fontSize: 40 }} />} className="dropdown-toggle text-dark" type="button" style={{ background: "none", border: "none", boxShadow: "0px 0px 0px 0px", textTransform: "none" }}>
												<span className="username username-hide-on-mobile text-dark letra"> {this.props.nombreUsuario} </span>
											</Button>
											<Modal isOpen={this.state.modal}
												toggle={this.toggle}
												className={this.props.className}
												style={{ maxWidth: '400px', width: '50%', margin: '10px auto' }}
											>
												<ModalHeader toggle={this.toggle} className="center">Cambiar contraseña</ModalHeader>
												<ModalBody>
													<form onSubmit={this.props.handleSubmit(this.handleSubmitForm)}>
														<Field name="contrasenaActual" component={RenderPasword} validate={[requerido,contrasena]} label="Contraseña actual" />
														<Field name="nuevaContrasena" component={RenderPasword} validate={[requerido,contrasena]} label="Nueva contraseña" />
														<Field name="verificacionNueva" component={RenderPasword} validate={[requerido,contrasena]} label="Confirmar nueva contraseña" />
														<ModalFooter>
															<div style={{ paddingRight: "120px" }}>
																<Button
																	style={{ background: this.props.configuracion.botones, fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }}
																	className="btn btn-dark"
																	variant="contained"
																	type="submit">
																	Cambiar contraseña
															</Button>
															</div>
														</ModalFooter>
													</form>
												</ModalBody>
											</Modal>

										</li>
									</div>
								</ul>
							</div>
						</nav>
					</div>
				</div>
				<NotificationContainer />
			</div>
		)
	}
}

const botones = {
	padding: "3px",
	color: "black",
	width: "100%",
	fontSize: "14px",
	fontFamily: 'sans-serif',
	background: "white",
	border: "none",
	textTransform: "none"
}


function mapStateToProps(state) {
	return {
		configuracion: state.conf.configuracion,
		mensaje: state.user.mensajeCerrarSesion,
		nombreUsuario: state.user.nombreUsuario,
		emailUsuario: state.user.emailUsuario,
		mensajeCambiar: state.user.mensajeContrasena
	}
}

let formularioContrasena = reduxForm({
	form: "formularioContrasena"
})(BarraSuperior);


export default withRouter(connect(mapStateToProps, { consultarConfiguracion, actionCambiarContrasena, actionCerrarSesion, actionConsultarCorreo, actualizarMensajeCerrar, actualizarMensajeCambiarContrasena, asignarNombreUsuario })(formularioContrasena));

