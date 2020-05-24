import React from 'react';

import 'react-notifications/lib/notifications.css';


import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
//componentes
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { generarInput, generarDate } from '../../utilitario/GenerarInputs.js'
import { TablePagination } from '@material-ui/core';
import Barra from '../general/BarraDirecciones.js'
import { formatoFecha } from '../../utilitario/MensajesError.js';
import { seleccione } from '../../utilitario/validacionCampos.js';
import { validacionDoscientosCaracteres, requerido } from '../../utilitario/validacionCampos.js'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select'
import SearchIcon from '@material-ui/icons/Search';
import ReplayIcon from '@material-ui/icons/Replay';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { connect } from 'react-redux';
import { actionConsultarReporte, actualizarReporte, actualizarMensaje, actionConsultarReporteCantidad, actionConsultarReporteTotal } from '../../actions/actionReporte.js';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import jsPDF from "jspdf";
import Tooltip from '@material-ui/core/Tooltip';
import { desencriptar } from '../../componentes/general/Encriptar.js';
import { URL_BASE } from '../../utilitario/Configuracion.js';
import "jspdf-autotable";

class ContenidoReportes extends React.Component {
	constructor(props) {
		super(props);
		this.reiniciar = this.reiniciar.bind(this);
		this.exportPDF = this.exportPDF.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
	}
	state = {
		valor: null,
		textoAyuda: 'Buscar',
		fechaInicio: [],
		fechaFin: [],
		page: 0,
		rowsPerPage: 5,
		reporte: []
	}

	componentDidMount(){
		if(localStorage.getItem('Token')===null){
			window.location.href = "/";
		}else{
			this.reiniciar();
		}
	}

	retornarValor = () => {
		return this.state.valor;
	}

	handleChangePage = (event, newPage) => {
		this.setState({ page: newPage });
		this.props.actionConsultarReporte(localStorage.getItem('Token'), this.state.reporte, this.state.rowsPerPage, newPage);
		this.props.actionConsultarReporteCantidad(localStorage.getItem('Token'), this.state.reporte);
	};

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: +event.target.value })
		this.setState({ page: 0 });
		this.props.actionConsultarReporteCantidad(localStorage.getItem('Token'), this.state.reporte);
		this.props.actionConsultarReporte(localStorage.getItem('Token'), this.state.reporte, +event.target.value, 0);
	};

	handleChangeDos = selectedOption => {
		switch (selectedOption.value) {
			case 1:
				this.setState({ textoAyuda: 'Ingrese el correo o numero de identificacion del usuario' })
				break;
			case 2:
				this.setState({ textoAyuda: 'Ingrese el nombre del modulo ' })

				break;
			case 3:
				this.setState({ textoAyuda: 'Ingrese una palabra clave de la actividad' })

				break;
			default:
				this.setState({ textoAyuda: 'Buscar' })
				break
		}
		this.setState({ valor: selectedOption });
	};

	actividades = () => {
		let opciones = [];
		opciones[0] = {
			label: 'Usuarios',
			value: 1,
		}
		opciones[1] = {
			label: 'Modulos',
			value: 2,
		}
		opciones[2] = {
			label: 'Actividades',
			value: 3,
		}
		return opciones;
	}
	componentDidUpdate() {
		if (this.props.mensaje !== '') {
			switch (this.props.mensaje) {
				case 'No se encontraron reportes':
					NotificationManager.warning('No se encontraron resultados');
					break;
				case 'Sin permiso':
					NotificationManager.error('No tiene permisos para realizar reportes');
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
		}
		this.props.actualizarMensaje('');
	}



	handleSubmit = formValues => {
		this.props.actualizarReporte();
		this.props.actualizarMensaje('');
		if (this.validarFechas(formatoFecha(formValues.fechaInicio), formatoFecha(formValues.fechaFin))) {
			let reporte = {
				idBusqueda: formValues.actividad.value,
				palabraBusqueda: formValues.palabraBusqueda,
				fechaInicio: formatoFecha(formValues.fechaInicio),
				fechaFin: formatoFecha(formValues.fechaFin)
			}
			this.setState({ reporte: reporte });
			this.setState({ fechaInicio: formatoFecha(formValues.fechaInicio) });
			this.setState({ fechaFin: formatoFecha(formValues.fechaFin) });
			this.props.actionConsultarReporte(localStorage.getItem('Token'), reporte, this.state.rowsPerPage, this.state.page);
			this.props.actionConsultarReporteCantidad(localStorage.getItem('Token'), reporte);
		}
	}

	validarFechas = (fechaInicio, fechaFin) => {
		if (fechaInicio > fechaFin) {
			NotificationManager.warning('Ingrese un rango de fechas valido');
			return false;
		} else {
			return true;
		}
	}

	reiniciar() {
		this.props.actualizarMensaje('');
		this.setState({ valor: null });
		this.setState({ textoAyuda: 'Buscar' })
		this.props.actualizarReporte();
		this.props.reset();
	}

	devolverFechaString = fechaRecibida => {
		let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		let dia = fechaRecibida.getDate();
		let mes = fechaRecibida.getUTCMonth();
		let ano = fechaRecibida.getFullYear();
		return `${dia}-${meses[mes]}-${ano}`;
	}

	calcularNumeroDePaginas() {
		if (!(this.props.reporte.length === 0 | this.props.reporte === undefined)) {
			return Math.round(this.props.reporte.length / 30) + 1;
		}
	}

	exportPDF = () => {
		try {
			const headers = {
				'Content-Type': 'application/json; charset=UTF-8',
				'TokenAuto': desencriptar(localStorage.getItem('Token')),
				'Permiso': 'SA_Realizar reportes'
			}
			axios.post(`${URL_BASE}/proyectosESCOM-web/api/bitacora/consultarTotal/`, this.state.reporte, { headers: headers })
				.then(response => {
					let informe=response.data;
					if (informe.length === 0 | informe === undefined) {
						NotificationManager.error('No hay datos para exportar');
					}else {
						var doc = new jsPDF()
						var totalPagesExp = this.calcularNumeroDePaginas();
						const headers = [["OPERACION", "MODULO", "TABLA INVOLUCRADA", "FECHA BITACORA", "CORREO DEL RESPONSABLE", "IP         "]];
						const data = informe.map(elt => [elt.operacion, elt.nombreModulo, elt.tablaInvolucrada, elt.fechaBitacora, elt.correo, elt.ip]);
						const logo = this.props.configuracion.logo;
						let fechaHoy = new Date();
						const fecha = this.devolverFechaString(fechaHoy);
						const fechaInicio = this.devolverFechaString(this.state.fechaInicio);
						const fechaFin = this.devolverFechaString(this.state.fechaFin);
						doc.autoTable({

							head: headers,
							body: data,
							headStyles: {
								fontSize: 8,
							},
							bodyStyles: {
								fontSize: 8,
							},
							alternateRowStyles: {
								fontSize: 8,
							},
							didDrawPage: function (data) {
								// Header
								doc.setFontSize(10);
								doc.setTextColor(40);
								doc.setFontStyle('normal');
								doc.addImage(logo, 'PNG', data.settings.margin.left, 8, 43, 15);
								doc.text('Fecha de generacion: ' + fecha, data.settings.margin.left + 125, 12);
								doc.text('Fecha de inicio: ' + fechaInicio, data.settings.margin.left + 125, 16);
								doc.text('Fecha de fin: ' + fechaFin, data.settings.margin.left + 125, 20);
								// Footer
								var str = 'Pagina ' + doc.internal.getNumberOfPages()
								// Total page number plugin only available in jspdf v1.0+
								if (typeof doc.putTotalPages === 'function') {
									str = str + ' de ' + totalPagesExp
								}
								doc.setFontSize(10)

								// jsPDF 1.4+ uses getWidth, <1.4 uses .width
								var pageSize = doc.internal.pageSize
								var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
								doc.text(str, data.settings.margin.left, pageHeight - 10)
							},
							margin: { top: 30 },
						})
						doc.save(`reporte de ${fecha}.pdf`);
					}
				}).catch((error) => {
					NotificationManager.error(`Ocurrio un error intentelo de nuevo `);
				});
		} catch (error) {
			NotificationManager.error(`Ocurrio un error intentelo de nuevo `);
		}
	}

	render() {
		const { page, rowsPerPage } = this.state;
		const { cantidad, reporte } = this.props;
		return (
			<div>
				<div className="text-left titulo" style={estiloLetrero}>
					<h4>Reportes</h4>
				</div>
				<Barra texto="Inicio > Reportes" />
				<div className="col-sm-12" style={{
					paddingTop: "20px",
					paddingRight: "46px",
					paddingLeft: "40px",
					paddingBottom: "7px",
				}}>
				</div>
				<div className="container" style={{
					paddingTop: "7px",
					paddingRight: "44px",
					paddingLeft: "40px",
					paddingBottom: "0px",
					margin: "0px 0px 32px"
				}}>
					<div className="container shadow" style={{ background: "white", padding: "27px" }}>
						<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
							<div className="row">
								<div className="col-sm-4" style={{ paddingTop: "15px", zIndex: '2' }}>
									<Field name="actividad" validate={[seleccione]} valor={this.retornarValor()} onChange={this.handleChangeDos} component={ReduxFormSelectDos} options={this.actividades()} />
								</div>
								<div className="col-sm-8" >
									<Field name="palabraBusqueda" component={generarInput} validate={[validacionDoscientosCaracteres, requerido]} className="form-control" label={this.state.textoAyuda} />
								</div>
							</div>
							<div className="col-sm-12" style={{
								paddingTop: "20px",
								paddingRight: "2px",
								paddingLeft: "15px",
								paddingBottom: "2px",
							}}>

								<div className="row">
									<div className="col-sm-6" style={{ zIndex: '0' }}>

										<Field name="fechaInicio" type="date" validate={[requerido]} component={generarDate} label="Fecha de inicio" />
									</div>
									<div className="col-sm-6">

										<Field name="fechaFin" type="date" component={generarDate} validate={[requerido]} label="Fecha de fin" />
									</div>
								</div>
							</div>
							<div className="col-sm-12" style={{
								paddingTop: "20px",
								paddingRight: "2px",
								paddingLeft: "15px",
								paddingBottom: "2px",
							}}>
								<div className="row">
									<div className="col-sm-6" style={{ paddingLeft: "300px" }}>
										<Button type="submit"
											startIcon={<SearchIcon />}
											className="btn btn-dark"
											style={{ background: this.props.configuracion.botones, fontSize: "14px", textTransform: "none" }}
											variant="contained">Buscar</Button>
									</div>
									<div className="col-sm-6">
										<Button
											onClick={this.reiniciar}
											className="btn btn-dark"
											style={{ background: "gray", fontSize: "14px", textTransform: "none" }}
											variant="contained"><ReplayIcon /></Button>
									</div>
								</div>
							</div>
						</form>
						<br />
						<Divider variant="middle" />
						<br />
						{reporte.length === 0 ? <></> : <>
							<TableContainer component={Paper}>
								<Table>
									<TableHead>
										<TableRow >
											<StyledTableCell >Operacion</StyledTableCell>
											<StyledTableCell >Nombre del modulo</StyledTableCell>
											<StyledTableCell >Tabla involucrada</StyledTableCell>
											<StyledTableCell >Fecha de bitacora</StyledTableCell>
											<StyledTableCell >Correo del responsable</StyledTableCell>
											<StyledTableCell >Ip</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody >
										{
											this.props.reporte.map((p, index) => {
												return <StyledTableRow key={index}>
													<StyledTableCell>{p.operacion}</StyledTableCell>
													<StyledTableCell >{p.nombreModulo}</StyledTableCell>
													<StyledTableCell >{p.tablaInvolucrada}</StyledTableCell>
													<StyledTableCell >{p.fechaBitacora}</StyledTableCell>
													<StyledTableCell >{p.correo}</StyledTableCell>
													<StyledTableCell >{p.ip}</StyledTableCell>
												</StyledTableRow >
											})
										}
									</TableBody>
									<TableFooter>
										<TableRow >
											<TablePagination
												labelDisplayedRows={({ from, to, count }) => {
													return `${from}-${to === -1 ? count : to} de ${count}`
												}}
												labelRowsPerPage={`Registros por página:`}
												nextIconButtonText={`Siguiente pagina`}
												backIconButtonText={`Pagina anterior`}
												rowsPerPageOptions={[5, 10, 15]}
												count={cantidad}
												rowsPerPage={rowsPerPage}
												page={page}
												onChangePage={this.handleChangePage}
												onChangeRowsPerPage={this.handleChangeRowsPerPage}
												ActionsComponent={TablePaginationActions}
											/>
										</TableRow>
									</TableFooter>
								</Table>
							</TableContainer>
							<br />
							<div style={{ paddingLeft: "400px" }}>
								<Button
									onClick={() => this.exportPDF()}
									startIcon={<PictureAsPdfIcon />}
									className="btn btn-dark"
									style={{ background: "#DF1417", fontSize: "14px", textTransform: "none" }}
									variant="contained">Generar PDF</Button>
							</div>
						</>}
					</div>
				</div>
				<NotificationContainer />
			</div >
		);
	}


}

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));


export const TablePaginationActions = (props) => {


	const classes = useStyles1();
	const theme = useTheme()
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<Tooltip title="Primera pagina">
				<IconButton
					onClick={handleFirstPageButtonClick}
					disabled={page === 0}
					aria-label="first page"
				>
					{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
				</IconButton>
			</Tooltip>

			<Tooltip title="Pagina anterior">
				<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
					{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
				</IconButton>
			</Tooltip>

			<Tooltip title="Siguiente pagina">
				<IconButton
					onClick={handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="next page"
				>
					{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
				</IconButton>
			</Tooltip>
			<Tooltip title="Ultima pagina">
				<IconButton
					onClick={handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="last page"
				>

					{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
				</IconButton>
			</Tooltip>
		</div>
	);
}


const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#e7ecf1',
		color: 'black',
		fontSize: 14,
		fontFamily: 'sans-serif',
		padding: '8px'
	},
	body: {
		fontSize: 13,
		fontFamily: 'sans-serif',
		padding: '10px'
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
}))(TableRow);

export const ReduxFormSelectDos = props => {
	const customStyles = {
		option: (provided, state) => ({
			...provided,
			fontSize: 13
		}),
		control: styles => ({ ...styles, backgroundColor: 'white', fontSize: 13, fontFamily: 'sans-serif', zIndex: "0" }),
		singleValue: (provided, state) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = 'opacity 300ms';
			return { ...provided, opacity, transition };
		}
	}
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
				placeholder='Seleccione'
				onChange={value => input.onChange(value)}
				onBlur={() => input.onBlur(input.value)}
				options={options}
				noOptionsMessage={() => 'No hay ninguna actividad que mostrar'}
			/>
			{touched && ((error && <span className="text-danger letra form-group">{error}</span>))}
		</div>
	)
}


const estiloLetrero = {
	paddingTop: "20px",
	paddingRight: "12px",
	paddingLeft: "40px",
	paddingBottom: "1px"
}

function mapStateToProps(state) {
	return {
		reporte: state.rep.reporte,
		mensaje: state.rep.mensajeReporte,
		configuracion: state.conf.configuracion,
		cantidad: state.rep.cantidad,
		reporteTotal: state.rep.reporteTotal
	}
}

let reporte = reduxForm({
	form: 'reporte'
})(ContenidoReportes)

export default withRouter(connect(mapStateToProps, { actionConsultarReporte, actualizarReporte, actionConsultarReporteTotal, actualizarMensaje, actionConsultarReporteCantidad })(reporte));
