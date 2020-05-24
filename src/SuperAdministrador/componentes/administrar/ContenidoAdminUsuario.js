import React from 'react';

//componentes
import Barra from '../general/BarraDirecciones.js'
import PopUpUsuario from '../popup/PopUpUsuario.js'
import MaterialTable from 'material-table';
import { confirmAlert } from 'react-confirm-alert';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { NotificationManager } from 'react-notifications';
import { TablePagination } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import {TablePaginationActions} from '../../utilitario/paginacion.js';

//redux conexion
import { connect } from 'react-redux';
import { actionConsultarUsuarios, actualizarMensajeSuspender, actionConsultarUsuariosFiltrados, actionConsultarCentidadUsuariosFiltrados, actionConsultarCentidadUsuarios, actionAsignarCedula, actualizarMensajeEditar, actionActualizarUsuarios, actionSuspenderActivarUsuario } from '../../actions/actionsUsuario.js'
import { withRouter } from 'react-router-dom';

class ContenidoAdminUsuario extends React.Component {
	constructor(props) {
		super(props);
		this.change = this.change.bind(this);
	}

	state = {
		cedula: 0,
		page: 0,
		rowsPerPage: 5,
		valor: ''
	}

	componentDidMount() {
		this.props.actionConsultarUsuarios(localStorage.getItem('Token'), this.state.rowsPerPage, this.state.page);
		this.props.actionConsultarCentidadUsuarios(localStorage.getItem('Token'));
	}



	componentDidUpdate() {
		if (this.props.mensajeSuspender !== '') {
			switch (this.props.mensajeSuspender) {
				case 'Sin permiso':
					NotificationManager.error('No tiene permisos para suspender/activar los usuarios');
					break;
				case 'Operacion hecha con exito':
					NotificationManager.success('Operacion realizada con exito');
					break;
				case 'No se encontraron datos':
					NotificationManager.error('No se encontraron datos registrados');
					break;
				case 'No se encontraron datos del usuario':
					NotificationManager.error('No se encontraron datos del usuario');
					break;
				case 'Ocurrio un error en el servidor':
					NotificationManager.error('Ocurrio un error en el servidor');
					break;
				case 'Servidor fuera de servicio temporalmente':
					NotificationManager.error('Servidor fuera de servicio temporalmente');
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
			this.props.actualizarMensajeSuspender('');
		}
	}

	actualizarUsuarios(numeroDocumento) {
		let nuevo = [];
		this.props.usuarios.forEach(function (task, index, array) {
			if (task.numeroDocumento === numeroDocumento) {
				if (task.estado === "Suspendido") {
					let usuario = {
						nombre: task.nombre,
						numeroDocumento: task.numeroDocumento,
						correoElectronico: task.correoElectronico,
						estado: "Activo"
					}
					nuevo.push(usuario);
				} else {
					let usuario = {
						nombre: task.nombre,
						numeroDocumento: task.numeroDocumento,
						correoElectronico: task.correoElectronico,
						estado: "Suspendido"
					}
					nuevo.push(usuario);
				}
			} else {
				nuevo.push(task);
			}
		});
		return nuevo;
	}

	activarDesactivarUsuario(cedula) {
		confirmAlert({
			title: '',
			message: '¿Esta seguro?',
			buttons: [
				{
					label: 'Si',
					onClick: () => {
						if (this.state.cedula === 0) { this.setState({ cedula: cedula }) };
						this.props.actualizarMensajeSuspender('');
						this.props.actionSuspenderActivarUsuario(cedula, localStorage.getItem('Token'), this.actualizarUsuarios(cedula));
					}
				},
				{
					label: 'No',
					onClick: () => NotificationManager.info('Se cancelo la operacion')
				}
			]
		});

	}

	handleChangePage = (event, newPage) => {
		this.setState({ page: newPage });
		if (this.state.valor === '') {
			this.props.actionConsultarUsuarios(localStorage.getItem('Token'), this.state.rowsPerPage, newPage);
		} else {
			this.props.actionConsultarUsuariosFiltrados(localStorage.getItem('Token'), this.state.valor, this.state.rowsPerPage, newPage);
		}
	};

	handleChangeRowsPerPage = (event) => {
		event.preventDefault();
		this.setState({ rowsPerPage: +event.target.value });
		this.setState({ page: 0 });
		if (this.state.valor === '') {
			this.props.actionConsultarCentidadUsuarios(localStorage.getItem('Token'));
			this.props.actionConsultarUsuarios(localStorage.getItem('Token'), +event.target.value, 0);
		} else {
			this.props.actionConsultarCentidadUsuariosFiltrados(localStorage.getItem('Token'), this.state.valor);
			this.props.actionConsultarUsuariosFiltrados(localStorage.getItem('Token'), this.state.valor, +event.target.value, 0);
		}

	};

	change = (event) => {
		this.setState({ valor: event.target.value });
		if (event.target.value === '') {
			this.setState({ valor: '' });
			this.props.actionConsultarUsuarios(localStorage.getItem('Token'), this.state.rowsPerPage, 0);
			this.props.actionConsultarCentidadUsuarios(localStorage.getItem('Token'));
		}
	}

	press = (event) => {
		const {valor,rowsPerPage}=this.state;
		if (event.key === 'Enter') {
			if (valor !== '') {
				var palabraFiltrada = valor.replace(/\//g,'%2f');
				this.props.actionConsultarCentidadUsuariosFiltrados(localStorage.getItem('Token'), palabraFiltrada);
				this.props.actionConsultarUsuariosFiltrados(localStorage.getItem('Token'), palabraFiltrada, rowsPerPage, 0);
			}
		}
	}

	cancelarBusqueda = () => {
		this.props.actionConsultarUsuarios(localStorage.getItem('Token'), this.state.rowsPerPage, 0);
		this.props.actionConsultarCentidadUsuarios(localStorage.getItem('Token'));
		this.setState({ valor: '' });
	}

	render() {
		const { page, rowsPerPage, valor } = this.state;
		const { cantidad } = this.props;
		return (
			<div>
				<div className="text-left titulo" style={estiloLetrero}>
					<h4>Administrar usuarios</h4>
				</div>
				<Barra texto="Inicio > Administración de usuarios" />
				<div className="col-sm-12" style={{
					paddingTop: "20px",
					paddingRight: "46px",
					paddingLeft: "40px",
					paddingBottom: "7px",
				}}>
				</div>

				<div className="container col-sm-12" style={{
					paddingTop: "5px",
					paddingRight: "43px",
					paddingLeft: "40px",
					paddingBottom: "25px"
				}}>
					<div className="container shadow" style={fondoBarraSuperior}>
						<div>
							{
								this.props.habilitado ? <div className="col-sm-12">
									<Alert severity="error" variant="outlined">
										<AlertTitle>Sin permiso</AlertTitle>
										No tiene permisos suficientes para consultar los usuarios registrados</Alert>
								</div> :
									<>
										<Input
											id="standard-adornment-password"
											type='text'
											style={{ zIndex: '2', top: '48px', left: '667px' }}
											value={valor}
											onChange={this.change}
											onKeyPress={this.press}
											placeholder='Buscar'
											startAdornment={
												<SearchIcon fontSize='small' />
											}
											endAdornment={
												<IconButton disabled={valor === '' ? true : false} onClick={this.cancelarBusqueda}>
													<ClearIcon fontSize='small' />
												</IconButton>
											}
										/>
										<Paper elevation={2}>
											<MaterialTable
												style={
													estiloTabla(rowsPerPage,this.props.usuarios)
													}
												title=""
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
														emptyDataSourceMessage: 'Ningun registro de usuarios encontrado'
													},
													toolbar: {
														searchTooltip: 'Buscar',
														searchPlaceholder: 'Buscar'
													}

												}}
												columns={[
													{
														title: 'Numero de identificacion', field: 'numeroDocumento', type: 'numeric',
														headerStyle: estiloCabecera,
														cellStyle: estiloFila
													},
													{ title: 'Nombre', field: 'nombre', headerStyle: estiloCabecera, cellStyle: estiloFila },
													{ title: 'Correo electronico', field: 'correoElectronico', headerStyle: estiloCabecera, cellStyle: estiloFila },
													{
														title: 'Estado', field: 'estado',
														render: rowData => {
															if (rowData.estado === 'Suspendido') {
																return <span className="label label-sm letra"
																	style={{
																		textShadow: "none!important",
																		fontSize: "12px",
																		fontFamily: "Open Sans,sans-serif",
																		fontWeight: "300",
																		padding: "3px 6px",
																		color: "#fff",
																		background: "#ED6B75"
																	}}>{rowData.estado}</span>
															} else {
																return <span className="label label-sm letra"
																	style={{
																		textShadow: "none!important",
																		fontSize: "12px",
																		fontFamily: "Open Sans,sans-serif",
																		fontWeight: "300",
																		padding: "3px 6px",
																		color: "#fff",
																		background: "#408725"
																	}}>{rowData.estado}</span>
															}
														},
														headerStyle: estiloCabecera, cellStyle: estiloFila
													},
												]}
												data={this.props.usuarios}
												options={{
													rowStyle: estiloFila,
													paging: false
												}}
												actions={[
													{
														icon: 'edit',
														tooltip: 'Editar informacion',
														onClick: (event, rowData) => {
															this.props.actualizarMensajeSuspender('');
															this.props.actionAsignarCedula(rowData.numeroDocumento);
															this.props.history.push('/editarUsuario');
														}
													},
													{
														icon: 'restore',
														tooltip: 'Suspender / Activar',
														onClick: (event, rowData) => this.activarDesactivarUsuario(rowData.numeroDocumento)
													},
													{
														icon: 'assignmentInd',
														tooltip: 'Administrar actividades',
														onClick: (event, rowData) => {
															this.props.actualizarMensajeSuspender('');
															this.props.actionAsignarCedula(rowData.numeroDocumento);
															this.props.history.push('/asignarActividadUsuario');
														}
													}
												]}

												components={{
													Toolbar: props => (
														<div className="row">
															<div className="col-sm-4">
																<div style={{ padding: '16px' }}>
																	<PopUpUsuario funcion={this.anadirTarea} />
																</div>
															</div>
														</div>
													),
													Container: props => (
														<Paper {...props} elevation={0} />
													)
												}}
											/>
											<Paper elevation={0}>
												<TablePagination
													rowsPerPageOptions={[5, 10, 15]}
													component="div"
													count={cantidad}
													labelDisplayedRows={({ from, to, count }) => {
														return `${from}-${to === -1 ? count : to} de ${count}`
													}}
													labelRowsPerPage={`Registros por página:`}
													nextIconButtonText={`Siguiente pagina`}
													backIconButtonText={`Pagina anterior`}
													rowsPerPage={this.state.rowsPerPage}
													page={page}
													onChangePage={this.handleChangePage}
													onChangeRowsPerPage={this.handleChangeRowsPerPage}
													ActionsComponent={TablePaginationActions}
												/>
											</Paper>
										</Paper>
									</>

							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}


const estiloTabla=(numeroDeRegistros,cantidadDeDatos) => {
	if(cantidadDeDatos.length<5){
		return { zIndex: '1', height: `${5 * 71}px` }
	}else{
		switch (numeroDeRegistros) {
			case 5:
				return { zIndex: '1', height: `100%` }
			case 10:
				return { zIndex: '1', height: `100%` }
			case 15:
				return { zIndex: '1', height: `100%` }
				default:
					break;
		}
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

const estiloLetrero = {
	paddingTop: "20px",
	paddingRight: "12px",
	paddingLeft: "40px",
	paddingBottom: "1px"
}

const fondoBarraSuperior = {
	background: "#FFFFFF",
	padding: '30px'
}




function mapStateToProps(state) {
	return {
		usuarios: state.user.usuariosRegistrados,
		cedulaEditar: state.user.cedula,
		habilitado: state.user.estadoUsuarios,
		mensajeSuspender: state.user.mensajeSuspender,
		cantidad: state.user.cantidad,
		mensajeEditar: state.user.mensajeEditar
	}
}


export default withRouter(connect(mapStateToProps, { actionConsultarUsuarios, actionConsultarUsuariosFiltrados, actionConsultarCentidadUsuariosFiltrados, actionConsultarCentidadUsuarios, actionAsignarCedula, actualizarMensajeSuspender, actualizarMensajeEditar, actionActualizarUsuarios, actionSuspenderActivarUsuario })(ContenidoAdminUsuario));