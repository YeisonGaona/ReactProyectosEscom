import React from 'react';
import 'react-notifications/lib/notifications.css';

import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import MaterialTable from 'material-table';
import { campo } from '../../utilitario/GenerarInputs.js';
import { withRouter } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Button from '@material-ui/core/Button';
import { actionConsultarModulosAcceso, actionCerrarSesionInicio, actualizarMensajeInicio } from '../../actions/actionsUsuario.js'
import { connect } from 'react-redux';

class ContenidoInicio extends React.Component {

	state = {
		habilitado: false
	}

	componentDidUpdate() {
		if (this.props.mensaje !== '') {
			switch (this.props.mensaje) {
				case 'Token requerido':
					return this.props.history.push('/');
				case 'Sin permiso':
					return NotificationManager.error('No tiene los permisos sucifientes');
				case 'token vencido':
					return this.props.history.push('/');
				case 'token no registrado':
					return this.props.history.push('/');
				case 'token incorrecto':
					return this.props.history.push('/');
				case 'Ocurrio un error en el servidor':
					return NotificationManager.error('Ocurrio un error en el servidor');
				case 'Ocurrio un error al momento de hacer la consulta':
					return NotificationManager.error('Ocurrio un error en el servidor');
				case 'No hay permisos asociados':
					if (!this.state.habilitado) {
						this.setState({ habilitado: true });
					}
					return NotificationManager.error('No tiene modulos para acceder');
				case 'sesion cerrada':
					return this.props.history.go('/');
				case 'Servidor fuera de servicio temporalmente':
					NotificationManager.error('Servidor fuera de servicio temporalmente');
					break;
				default:
					return NotificationManager.warning('error desconocido');;
			}
		}
		this.props.actualizarMensajeInicio('');
	}

	componentWillMount() {
		this.props.actionConsultarModulosAcceso(localStorage.getItem('Token'));
	}

	onClickCancelar = (event) => {
		event.preventDefault();
		this.props.actionCerrarSesionInicio(localStorage.getItem('Token'));
	}

	render() {
		return (
			<>
				{
					this.state.habilitado ?

						<Modal isOpen={true}
							toggle={this.toggle}
							className={this.props.className}
							size="col-md-6">
							<ModalBody>
								<div className="col-sm-12">
									<Alert severity="warning" variant="outlined">
										<AlertTitle>Aun no hay modulos disponibles</AlertTitle>
									Aun no tiene permisos asignados en alguno de los diferentes modulos</Alert>
									<br />
									<div style={{ paddingLeft: '120px' }}>
										<Button
											type="submit"
											variant="contained"
											className="btn btn-dark"
											style={{
												background: "gray",
												fontSize: "14px",
												fontFamily: "sans-serif",
												textTransform: "none"
											}}
											onClick={this.onClickCancelar}
											startIcon={<ExitToAppIcon />}
										>Cerrar sesion</Button>
									</div>
								</div>
							</ModalBody>
						</Modal>
						: <><Modal isOpen={true}
							toggle={this.toggle}
							className={this.props.className}
							size="col-md-6"
							style={{width:'450px'}}
						>
							<ModalBody>
								<MaterialTable
									title="Modulos disponibles"
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
											emptyDataSourceMessage: 'No se encontraron modulos disponibles'
										},
										toolbar: {
											searchTooltip: 'Buscar',
											searchPlaceholder: 'Buscar'
										}

									}}
									columns={[
										{
											title: '', field: 'imagenModulo', render: rowData => {
												return <Button
														variant="contained"
														style={{
															background: "white",
															fontSize: "14px",
															fontFamily: "sans-serif",
															textTransform: "none",
															width:'100%'
														}}
														onClick={() => {
															this.props.history.push(rowData.url);
														}}
														startIcon={<img src={campo(rowData.imagenModulo)} alt='' style={{ width: 60, borderRadius: '50%' }} />}
													>
													<div>
														<span>{rowData.nombreModulo}</span>
													</div>
													</Button>
											}
										}
									]}
									data={this.props.modulosAcceso}
									options={{
										search: false,
										rowStyle: estiloFila
									}}
									
								/>
								<ModalFooter>

								</ModalFooter>

							</ModalBody>
						</Modal>
							<NotificationContainer />
						</>
				}
			</>
		);
	}


}


const estiloFila = {
	fontSize: '14px',
	fontFamily: 'sans-serif',
	padding: '8px',
}


function mapStateToProps(state) {
	return {
		configuracion: state.conf.configuracion,
		modulosAcceso: state.user.modulosAcceso,
		mensaje: state.user.mensajeInicio
	}
}

export default withRouter(connect(mapStateToProps, { actionConsultarModulosAcceso, actionCerrarSesionInicio, actualizarMensajeInicio })(ContenidoInicio));