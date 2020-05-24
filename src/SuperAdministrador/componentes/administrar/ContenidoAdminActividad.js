import React from 'react';



import MaterialTable from 'material-table';

//componentes
import Barra from '../general/BarraDirecciones.js'
import PopUpActividad from '../popup/PopUpActividad.js'
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { TablePagination } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import {TablePaginationActions} from '../../utilitario/paginacion.js';

//redux conexion
import { connect } from 'react-redux';
import { actionConsultarActividades, actionConsultarCantidadActividadesFiltradas, actionFiltrarActividades, actionSuspenderActivarActividad, actionConsultarCantidadActividades, actualizarMensajeRegistrar, actionAsignarCodigoActividad, actualizarMensajeSuspender } from '../../actions/actionActividad.js'
import { withRouter } from 'react-router-dom';

class ContenidoAdminActividad extends React.Component {

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

	componentDidUpdate() {
		if (this.props.mensajeEditar !== '') {
			if (this.props.mensajeEditar === 'actividad registrada') {
				NotificationManager.success('Actividad registrada correctamente');
				this.props.actionConsultarActividades(localStorage.getItem('Token'), this.state.rowsPerPage, this.state.page);
				this.props.actualizarMensajeRegistrar('');
			}
		}
		if (this.props.mensajeSuspender !== '') {
			switch (this.props.mensajeSuspender) {
				case 'Sin permiso':
					NotificationManager.error('No tiene permisos para suspender/activar los usuarios');
					this.props.actualizarMensajeSuspender('');
					break;
				case 'Operacion hecha con exito':
					NotificationManager.success('Operacion realizada con exito');
					this.props.actualizarMensajeSuspender('');
					break;
				case 'La actividad ya se encuentra registrada':
					NotificationManager.warning('La actividad ya se encuentra registrada intente con otro nombre');
					this.props.actualizarMensajeSuspender('');
					break;
				case 'El modulo no se encuentra registrado':
					NotificationManager.error('El modulo asociado no se encuentra registrado');
					this.props.actualizarMensajeSuspender('');
					break;
				case 'No se encontraron datos':
					NotificationManager.warning('No se encontraron modulos registrados');
					this.props.actualizarMensajeSuspender('');
					break;
				case 'No se encontraron datos de la actividad':
					NotificationManager.warning('No se encontraron modulos registrados');
					this.props.actualizarMensajeSuspender('');
					break;
				case 'Ocurrio un error en el servidor':
					NotificationManager.error('Ocurrio un error en el servidor');
					this.props.actualizarMensajeSuspender('');
					break;
				case 'Servidor fuera de servicio temporalmente':
					NotificationManager.error('Servidor fuera de servicio temporalmente');
					this.props.actualizarMensajeSuspender('');
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
		this.props.actualizarMensajeSuspender('');
	}


	activarDesactivarActividad(codigo) {
		confirmAlert({
			title: '',
			message: '¿Esta seguro?',
			buttons: [
				{
					label: 'Si',
					onClick: () => {
						this.props.actualizarMensajeSuspender('');
						if (codigo === undefined) {
							this.props.actionConsultarActividades(localStorage.getItem('Token'));
						} else {
							this.props.actionSuspenderActivarActividad(codigo, localStorage.getItem('Token'), this.actualizarActividades(codigo));

						}
					}
				},
				{
					label: 'No',
					onClick: () => NotificationManager.info('Se cancelo la operacion')
				}
			]
		});

	}

	actualizarActividades(codigoActividad) {
		let nuevo = [];
		this.props.actividades.forEach(function (task, index, array) {
			if (task.idActividad === codigoActividad) {
				if (task.estado === "Suspendido") {
					let actividad = {
						idActividad: task.idActividad,
						nombre: task.nombre,
						descripcionActividad:task.descripcionActividad,
						moduloActividad: task.moduloActividad,
						estado: "Activo"
					}
					nuevo.push(actividad);
				} else {
					let actividad = {
						idActividad: task.idActividad,
						nombre: task.nombre,
						descripcionActividad:task.descripcionActividad,
						moduloActividad: task.moduloActividad,
						estado: "Suspendido"
					}
					nuevo.push(actividad);
				}
			} else {
				nuevo.push(task);
			}
		});
		return nuevo;
	}


	componentDidMount() {
		this.props.actionConsultarActividades(localStorage.getItem('Token'), this.state.rowsPerPage, this.state.page);
		this.props.actionConsultarCantidadActividades(localStorage.getItem('Token'));
	}


	handleChangePage = (event, newPage) => {
		this.setState({ page: newPage });
		if (this.state.valor === '') {
			this.props.actionConsultarActividades(localStorage.getItem('Token'), this.state.rowsPerPage, newPage);
		} else {
			this.props.actionFiltrarActividades(localStorage.getItem('Token'), this.state.valor, this.state.rowsPerPage, newPage);
		}
	};

	handleChangeRowsPerPage = (event) => {
		event.preventDefault();
		this.setState({ rowsPerPage: +event.target.value });
		this.setState({ page: 0 });
		if (this.state.valor === '') {
			this.props.actionConsultarActividades(localStorage.getItem('Token'), +event.target.value, 0);
			this.props.actionConsultarCantidadActividades(localStorage.getItem('Token'));
		} else {
			this.props.actionConsultarCantidadActividadesFiltradas(localStorage.getItem('Token'), this.state.valor);
			this.props.actionFiltrarActividades(localStorage.getItem('Token'), this.state.valor, +event.target.value, 0);
		}

	};

	change = (event) => {
		this.setState({ valor: event.target.value });
		if (event.target.value === '') {
			this.setState({ valor: '' });
			this.props.actionConsultarActividades(localStorage.getItem('Token'), this.state.rowsPerPage, 0);
			this.props.actionConsultarCantidadActividades(localStorage.getItem('Token'));
		}
	}

	press = (event) => {
		const { valor, rowsPerPage } = this.state;
		if (event.key === 'Enter') {
			if (valor !== '') {
				var palabraFiltrada = valor.replace(/\//g, '%2f');
				this.props.actionConsultarCantidadActividadesFiltradas(localStorage.getItem('Token'), palabraFiltrada);
				this.props.actionFiltrarActividades(localStorage.getItem('Token'), palabraFiltrada, rowsPerPage, 0);
			}
		}
	}

	handleClickShowPassword = () => {
		this.props.actionConsultarActividades(localStorage.getItem('Token'), this.state.rowsPerPage, 0);
		this.props.actionConsultarCantidadActividades(localStorage.getItem('Token'));
		this.setState({ valor: '' });
	}


	render() {
		const { page, rowsPerPage, valor } = this.state;
		const { cantidad } = this.props;
		return (
			<div>
				<div className="text-left titulo" style={estiloLetrero}>
					<h4>Administrar actividades</h4>
				</div>
				<Barra texto="Inicio > Administración de actividades" />
				<div className="col-sm-12" style={{
					paddingTop: "20px",
					paddingRight: "46px",
					paddingLeft: "40px",
					paddingBottom: "7px"
				}}>
				</div>
				<div className="container" style={{
					paddingTop: "7px",
					paddingRight: "44px",
					paddingLeft: "40px",
					paddingBottom: "0px",
					margin: "0px 0px 32px"
				}}>
					<div className="container shadow" style={{ background: "#FFFFFF", padding: "30px", paddingTop: '0px' }}>
						<br />
						<div className="jumbotron p-1 jumbotron-fluid" style={{ background: "white" }}>
							{
								this.props.habilitado ? <div className="col-sm-12">
									<Alert severity="error" variant="outlined">
										<AlertTitle>Sin permiso</AlertTitle>
										No tiene permisos suficientes para administrar las actividades</Alert>
								</div> :
									<>
										<Input
											id="standard-adornment-password"
											type='text'
											style={{ zIndex: '2', top: '3em', left: '41.688em' }}
											value={valor}
											onChange={this.change}
											onKeyPress={this.press}
											placeholder='Buscar'
											startAdornment={
												<SearchIcon fontSize='small' />
											}
											endAdornment={
												<IconButton disabled={valor === '' ? true : false} onClick={this.handleClickShowPassword}>
													<ClearIcon fontSize='small' />
												</IconButton>
											}
										/>
										<Paper elevation={2} >
											<MaterialTable

												style={
													estiloTabla(rowsPerPage,this.props.actividades)
													}
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
														emptyDataSourceMessage: 'Aun no hay ningun actividad registrada'
													},
													toolbar: {
														searchTooltip: 'Buscar',
														searchPlaceholder: 'Buscar'
													}
												}}
												columns={[
													{ title: 'Nombre', field: 'nombre', headerStyle: estiloCabecera, cellStyle: estiloFila },
													{ title: 'Descripcion', field: 'descripcionActividad', headerStyle: estiloCabecera, cellStyle: estiloFila },
													{ title: 'Modulo', field: 'moduloActividad', headerStyle: estiloCabecera, cellStyle: estiloFila },
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
												data={this.props.actividades}
												options={{
													rowStyle: estiloFila,
													paging: false

												}}
												actions={[
													{
														icon: 'edit',
														tooltip: 'Editar informacion',
														onClick: (event, rowData) => {
															this.props.actionAsignarCodigoActividad(rowData.idActividad);
															this.props.history.push('/editarActividad');
														}
													},
													{
														icon: 'restore',
														tooltip: 'Suspender / Activar',
														onClick: (event, rowData) => this.activarDesactivarActividad(rowData.idActividad)
													}
												]}
												components={{
													Toolbar: props => (
														<div className="row">
															<div className="col-sm-4">
																<div style={{ padding: '16px' }}>
																	<PopUpActividad />
																</div>
															</div>
														</div>
													),
													Container: props => (
														<Paper {...props} elevation={0} />
													)
												}}
											/>
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
												rowsPerPage={rowsPerPage}
												page={page}
												onChangePage={this.handleChangePage}
												onChangeRowsPerPage={this.handleChangeRowsPerPage}
												ActionsComponent={TablePaginationActions}
											/>
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
	fontSize: '13px',
	fontFamily: 'sans-serif',
	padding: '8px',
	background: '#e7ecf1'

}

const estiloFila = {
	fontSize: '12px',
	fontFamily: 'sans-serif',
	padding: '8px',
}

const estiloLetrero = {
	paddingTop: "20px",
	paddingRight: "12px",
	paddingLeft: "40px",
	paddingBottom: "1px"
}


function mapStateToProps(state) {
	return {
		actividades: state.act.actividadesRegistradas,
		habilitado: state.act.estadoActividades,
		configuracion: state.conf.configuracion,
		codigoActividad: state.act.codigoActividad,
		mensajeSuspender: state.act.mensajeSuspender,
		mensajeEditar: state.act.mensajeRegistrar,
		cantidad: state.act.cantidad
	}
}


export default withRouter(connect(mapStateToProps, { actionConsultarActividades, actionConsultarCantidadActividadesFiltradas, actionConsultarCantidadActividades, actionFiltrarActividades, actualizarMensajeRegistrar, actionSuspenderActivarActividad, actionAsignarCodigoActividad, actualizarMensajeSuspender })(ContenidoAdminActividad));
