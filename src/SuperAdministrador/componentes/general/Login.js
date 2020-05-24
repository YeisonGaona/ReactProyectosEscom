import React from 'react';

import '../../css/menu.css'
import '../../css/registro.css'

import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form';
import Alert from '@material-ui/lab/Alert';
import { generarInputLogin } from '../../utilitario/GenerarInputs.js';
import { actionLoginUsuario, actualizarMensajeLogin, asignarNombreUsuario, actionAsignarIp, actionRecuperarContrasena, actualizarMensajeInicio } from '../../actions/actionsUsuario.js'
import { consultarConfiguracionLogin } from '../../actions/actionConfiguracion.js';
import { connect } from 'react-redux';
import { requerido, correo, validacionCincuentaCaracteres, validacionTreintaCaracteres } from '../../utilitario/validacionCampos.js';
import imagenDefecto from '../../imagenes/defectoLogin.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

	state = {
		habilitado: false,
		recuperar: false,
		severidad: 'error'
	}



	componentDidMount() {
		this.props.actualizarMensajeInicio('');
		this.props.consultarConfiguracionLogin();
	}

	componentDidUpdate() {
		switch (this.props.mensaje) {
			case 'Login correcto':
				this.props.actionAsignarIp();
				this.props.history.push('/inicio');
				break;
			case 'Se enviaron las instrucciones para recuperar la contraseña a su correo':
				if (this.state.severidad !== 'success') {
					this.setState({ severidad: 'success' });
				}
				break;
			default:
				if (this.state.severidad !== 'error') {
					this.setState({ severidad: 'error' });
				}
				break;
		}
	}

	habilitarBoton = (valor) => {
		this.setState({
			habilitado: valor
		});
	}

	handleSubmit = formValues => {
		if (formValues.correoRecuperar === undefined) {
			this.props.actionLoginUsuario(formValues.correo, formValues.contrasena, this.habilitarBoton);
			this.props.reset();
		} else {
			this.props.actionRecuperarContrasena(formValues.correoRecuperar, this.habilitarBoton);
			this.props.reset();
		}
	}

	onClickCancelar = (event) => {
		event.preventDefault();
		this.props.reset();
		this.props.actualizarMensajeLogin('');
		this.setState(prevState => ({
			recuperar: !prevState.recuperar
		}));
	}


	render() {
		return (
			<div>
				<div className="container-fluid" style={{ background: "white" }}>
					<div className="row no-gutter">
						<div className="d-none d-md-flex col-md-4 col-lg-6" style={{ paddingLeft: "0px" }} >
							{
								this.props.configuracionLogin.imagenLogin === undefined ? <div style={{ background: "white" }}><img src={imagenDefecto} alt="" style={{ backgroundSize: 'cover', backgroundPosition: 'center' }} width="660px" height="695px" /></div>
									:
									<img src={this.props.configuracionLogin.imagenLogin} alt="" style={{ backgroundSize: 'cover', backgroundPosition: 'center' }} width="660px" height="695px" />
							}
						</div>
						<div className="col-md-8 col-lg-6">
							<div className="login d-flex align-items-center py-5">
								<div className="container">
									<div className="row">
										<div className="col-md-6 col-lg-10 mx-auto">
											{this.state.recuperar ? <>
												<form onSubmit={this.props.handleSubmit(this.handleSubmit)} className="center">
													<h3 className="login-heading mb-4">Sistema para el apoyo administrativo</h3>
													<h5 className="login-heading mb-4">Recuperar contraseña</h5>
													<p style={{ color: "gray" }}>Introduzca su dirección de correo electrónico, a continuación para restablecer su contraseña.</p>
													<div className="row">
														<div className="col-md-12">
															<Field name="correoRecuperar" component={generarInputLogin} validate={[requerido, correo]} label="Correo electronico" />
														</div>
													</div>
													<div className="row">
														<div className="col-sm-12 center">

															<Field name="mensaje" component={generarMensaje} type={this.state.severidad} label={this.props.mensaje} />
														</div>
													</div>
													<br />
													<div className="row">
														<div className="col-sm-6">
															<Button style={{ background: 'gray', fontSize: "15px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" disabled={this.state.habilitado} onClick={this.onClickCancelar}>Cancelar</Button>

														</div>
														<div className="col-sm-4">
															<Button style={{ background: this.props.configuracionLogin.botones, fontSize: "15px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" disabled={this.state.habilitado} type="submit">Enviar</Button>

														</div>
														{
															this.state.habilitado ? <div className="col-sm-2 center"><CircularProgress color="primary" /></div> : <div></div>
														}
													</div>
												</form>
											</> : <>
													<form onSubmit={this.props.handleSubmit(this.handleSubmit)} className="center">
														<h3 className="login-heading mb-4">Sistema para el apoyo administrativo</h3>
														<div className="row">
															<div className="col-md-12">
																<Field name="correo" component={generarInputLogin} validate={[requerido, validacionCincuentaCaracteres]} label="Correo electronico" />
															</div>
														</div>
														<div className="row">
															<div className="col-md-12">
																<Field name="contrasena" type="password" component={generarInputLogin} validate={[requerido, validacionTreintaCaracteres]} label="Contraseña" />
															</div>
														</div>
														<div className="row">
															<div className="col-sm-12 center">
																<Field name="mensaje" component={generarMensaje} type={this.state.severidad} label={this.props.mensaje} />
															</div>
														</div>
														<br />
														<div className="row">
															<div className="col-sm-6">
																<Button onClick={this.onClickCancelar} style={{ fontSize: "15px", fontFamily: "sans-serif", textTransform: "none", color: "#3F51B5" }}>
																	¿ Olvido su contraseña ?</Button>
															</div>
															<div className="col-sm-4">
																<Button style={{ background: this.props.configuracionLogin.botones, fontSize: "15px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" disabled={this.state.habilitado} type="submit">Iniciar sesion</Button>

															</div>
															{
																this.state.habilitado ? <div className="col-sm-2 center"><CircularProgress color="primary" /></div> : <div></div>
															}
														</div>
													</form>

												</>}

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const generarMensaje = ({ input, label, type, meta: { touched, error, warning } }) => (
	<div>
		<div>
			<br />
			{label === undefined | label === '' ? <div></div> : <Alert draggable={true} severity={type}>{label}</Alert>}
			<br />
		</div>
	</div>
)


function mapStateToProps(state) {
	return {
		mensaje: state.user.mensajeLogin,
		nombreUsuario: state.user.nombreUsuario,
		configuracionLogin: state.conf.configuracionLogin,
		mensajeInicio: state.user.mensajeInicio
	}
}

let formulario = reduxForm({
	form: 'loginUsuario'
})(Login)



export default withRouter(connect(mapStateToProps, { actionAsignarIp, actionLoginUsuario, actualizarMensajeInicio, actionRecuperarContrasena, actualizarMensajeLogin, consultarConfiguracionLogin, asignarNombreUsuario })(formulario));
