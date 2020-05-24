import React from 'react';


//componentes
import Barra from '../general/BarraDirecciones.js'
import PopUpModulo from '../popup/PopUpModulo.js'
import MaterialTable from 'material-table';
import MTableToolbar from '../../utilitario/MTableToolbar.js';
import { confirmAlert } from 'react-confirm-alert';
import { NotificationManager } from 'react-notifications';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { campo } from '../../utilitario/GenerarInputs.js';

//redux conexion
import { connect } from 'react-redux';
import { actionConsultarModulos, actionAsignarModulo, actionAsignarCodigoModulo, actionSuspenderActivarModulo, actualizarMensajeRegistrar, actualizarMensajeSuspenderModulo } from '../../actions/actionsModulo.js';
import { withRouter } from 'react-router-dom';

class ContenidoAdminModulo extends React.Component {

	state = {
		codigoModulo: 0
	}

	actualizarModulos(idModulo) {
		let nuevo = [];
		this.props.modulosRegistrados.forEach(function (task, index, array) {
			if (task.idModulo === idModulo) {
				if (task.estadoModulo === "Suspendido") {
					let modulo = {
						idModulo: task.idModulo,
						estadoModulo: "Activo",
						nombreModulo: task.nombreModulo,
						descripcionModulo: task.descripcionModulo,
						imagenModulo: task.imagenModulo
					}
					nuevo.push(modulo);
				} else {
					let modulo = {
						nombreModulo: task.nombreModulo,
						idModulo: task.idModulo,
						descripcionModulo: task.descripcionModulo,
						estadoModulo: "Suspendido",
						imagenModulo: task.imagenModulo
					}
					nuevo.push(modulo);
				}
			} else {
				nuevo.push(task);
			}
		});
		return nuevo;

	}

	componentWillMount() {
		this.props.actionConsultarModulos(localStorage.getItem('Token'));
	}

	componentDidUpdate() {
		if (this.props.mensajeRegistrar !== '') {
			if (this.props.mensajeRegistrar === 'modulo registrado') {
				NotificationManager.success('Modulo registrado correctamente');
				this.props.actionConsultarModulos(localStorage.getItem('Token'));
				this.props.actualizarMensajeRegistrar('');
			}
		}
		if (this.props.mensajeSuspender !== '') {
			switch (this.props.mensajeSuspender) {
				case 'Sin permiso':
					NotificationManager.error('No tiene permisos para suspender/activar los modulos');
					break;
				case 'Operacion hecha con exito':
					NotificationManager.success('Operacion realizada con exito');
					break;
				case 'Ocurrio un error en el servidor':
					NotificationManager.error('Ocurrio un error en el servidor');
					this.props.actualizarMensajeSuspenderModulo('');
					break;
				case 'Servidor fuera de servicio temporalmente':
					NotificationManager.error('Servidor fuera de servicio temporalmente');
					this.props.actualizarMensajeSuspenderModulo('');
					break;
				case 'No se encontraron datos':
					NotificationManager.warning('Aun no se encuentran modulos registrados');
					this.props.actualizarMensajeSuspenderModulo('');
					break;
				case 'No se encontraron datos del modulo':
					NotificationManager.error('Ocurrio un error al procesar los datos del modulo');
					this.props.actualizarMensajeSuspenderModulo('');
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
		this.props.actualizarMensajeSuspenderModulo('');
	}



	activarDesactivarModulo(codigoModulo) {
		confirmAlert({
			title: '',
			message: '¿Esta seguro?',
			buttons: [
				{
					label: 'Si',
					onClick: () => {
						this.props.actualizarMensajeSuspenderModulo('');
						this.props.actionSuspenderActivarModulo(codigoModulo, localStorage.getItem('Token'), this.actualizarModulos(codigoModulo));
					}
				},
				{
					label: 'No',
					onClick: () => NotificationManager.info('Se cancelo la operacion')
				}
			]
		});

	}

	render() {
		return (
			<div>
				<div className="text-left titulo" style={estiloLetrero}>
					<h4>Administrar modulos</h4>
				</div>
				<Barra texto="Inicio > Administración de modulos" />
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
					<div className="container shadow" style={{ background: "#FFFFFF", padding: "30px" }}>
						{
							this.props.habilitado ? <div className="col-sm-12">
								<Alert severity="error" variant="outlined">
									<AlertTitle>Sin permiso</AlertTitle>
									No tiene permisos suficientes para consultar los modulos registrados</Alert>
							</div> :
								<MaterialTable
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
											emptyDataSourceMessage: 'Aun no hay ningun modulo registrado'
										},
										toolbar: {
											searchTooltip: 'Buscar',
											searchPlaceholder: 'Buscar'
										}
									}}
									columns={[
										{ title: '', field: 'imagenModulo', render: rowData => { return <img src={campo(rowData.imagenModulo)} alt='' style={{ width: 60, borderRadius: '50%' }} /> } },
										{ title: 'Nombre de modulo', field: 'nombreModulo', headerStyle: estiloCabecera, cellStyle: estiloFila },
										{ title: 'Descripcion del modulo', field: 'descripcionModulo', headerStyle: estiloCabecera, cellStyle: estiloFila },
										{
											title: 'Estado', field: 'estadoModulo',
											render: rowData => {
												if (rowData.estadoModulo === 'Suspendido') {
													return <span className="label label-sm letra"
														style={{
															textShadow: "none!important",
															fontSize: "12px",
															fontFamily: "Open Sans,sans-serif",
															fontWeight: "300",
															padding: "3px 6px",
															color: "#fff",
															background: "#ED6B75"
														}}>{rowData.estadoModulo}</span>
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
														}}>{rowData.estadoModulo}</span>
												}
											},
											headerStyle: estiloCabecera, cellStyle: estiloFila
										},
									]}
									data={this.props.modulosRegistrados}
									options={{
										search: true,
										rowStyle: estiloFila

									}}
									actions={[
										{
											icon: 'edit',
											tooltip: 'Editar informacion',
											onClick: (event, rowData) => {
												
												let moduloEdit = {
													'idModulo': rowData.idModulo,
													'imagenModulo': rowData.imagenModulo,
													'nombreModulo': rowData.nombreModulo,
													'descripcionModulo': rowData.descripcionModulo,
													'url': rowData.url.replace('/', '')
												}
												this.props.actionAsignarModulo(moduloEdit);
												this.props.actionAsignarCodigoModulo(rowData.idModulo);
												this.props.history.push('/editarModulo');
											}
										},
										{
											icon: 'restore',
											tooltip: 'Suspender / Activar',
											onClick: (event, rowData) => this.activarDesactivarModulo(rowData.idModulo)
										},
										{
											icon: 'assignmentInd',
											tooltip: 'Administrar actividades',
											onClick: (event, rowData) => {
												this.props.actionAsignarCodigoModulo(rowData.idModulo);
												this.props.history.push('/asignarActividadModulo')
											}
										}
									]}

									components={{
										Toolbar: props => (
											<div className="row">
												<div className="col-sm-4">
													<div style={{ padding: '16px' }}>
														<PopUpModulo />
													</div>
												</div>
												<div className="col-sm-8">
													<MTableToolbar {...props} />
												</div>
											</div>
										),
									}}

								/>
						}
					</div>
				</div>
			</div>
		);



	}
}


const estiloCabecera = {
	fontSize: '14px',
	fontFamily: 'sans-serif',
	padding: '8px',
	background: '#e7ecf1'

}

const estiloFila = {
	fontSize: '14px',
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
		modulosRegistrados: state.mod.modulosRegistrados,
		habilitado: state.mod.estadoModulos,
		codigoModulo: state.mod.codigoModulo,
		mensajeSuspender: state.mod.mensajeSuspenderModulo,
		mensajeRegistrar: state.mod.mensajeRegistrarModulo,
	}
}

export default withRouter(connect(mapStateToProps, { actionConsultarModulos, actionAsignarModulo, actionAsignarCodigoModulo, actionSuspenderActivarModulo, actualizarMensajeRegistrar, actualizarMensajeSuspenderModulo })(ContenidoAdminModulo));

