import React from 'react';

//Menu lateral, superior y contenido de inicio
import MenuSuperior from "./SuperAdministrador/componentes/menu/MenuBlancoSuperior.js"
import MenuLateral from "./SuperAdministrador/componentes/menu/MenuLateral.js"
import Login from "./SuperAdministrador/componentes/general/Login.js"
import Inicio from "./SuperAdministrador/componentes/general/ContenidoInicio.js"

//inactividad
import IdleTimer from 'react-idle-timer'

//administrar usuario
import EditarUsuario from './SuperAdministrador/componentes/editar/editarUsuario.js'
import AsignarActividadUsuario from './SuperAdministrador/componentes/asignar/AsignarActividadUsuario.js'
import Recuperar from './SuperAdministrador/componentes/general/RecuperarContrasena.js';

//administrar modulo
import AdminModulo from './SuperAdministrador/componentes/administrar/ContenidoAdminModulo.js'
import EditarModulo from './SuperAdministrador/componentes/editar/editarModulo.js';
import AsignarActividadModulo from './SuperAdministrador/componentes/asignar/asignarActividadModulo.js';
import EditarActividad from './SuperAdministrador/componentes/editar/editarActividad.js';

import Configuracion from './SuperAdministrador/componentes/administrar/ContenidoConfiguracion.js';
//Administrar actividad
import Actividad from './SuperAdministrador/componentes/administrar/ContenidoAdminActividad.js'

import RedireccionarUsuario from './SuperAdministrador/componentes/redirecciones/RedireccionarUsuario.js';
import ContenidoReportes from './SuperAdministrador/componentes/reportes/ContenidoReportes.js';
import NotFound from './SuperAdministrador/componentes/general/Pagina 404.js';

//estilos
import './SuperAdministrador/css/business-casual.css'
import './SuperAdministrador/css/estilos.css'
import './SuperAdministrador/css/bootstrap.min.css'
import './SuperAdministrador/css/menu.css'


//rutas
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

//store
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './SuperAdministrador/reducers';
import thunk from 'redux-thunk'


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

class App extends React.Component {

	constructor(props) {
		super(props)
		this.idleTimer = null
		this.onAction = this._onAction.bind(this)
		this.onActive = this._onActive.bind(this)
		this.onIdle = this._onIdle.bind(this)
	}


	render() {
		return (
			<Provider store={createStoreWithMiddleware(reducers)}>
				<IdleTimer
					ref={ref => { this.idleTimer = ref }}
					element={document}
					onActive={this.onActive}
					onIdle={this.onIdle}
					onAction={this.onAction}
					debounce={250}
					timeout={1000 * 60 * 10} />
				<Router>
					<Switch>
						{/*Ruta para inicio*/}
						<Route exact path="/" render={() => {
							return <div>
								<Login />
							</div>
						}}>
						</Route>
						<Route exact path="/recuperarContrasena/:token" render={() => {
							return <div>
								<Recuperar />
							</div>
						}}>
						</Route>
						<RutaProtegida exact path="/inicio">
							<>
								<div id="wrapper">
									<Inicio />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegidaMenus path="/adminUsuario">
							<>
								<div id="wrapper">
									<RedireccionarUsuario />
								</div>
							</>
						</RutaProtegidaMenus>

						<RutaProtegidaMenus path="/editarUsuario">
							<>
								<div id="wrapper">
									<EditarUsuario />
								</div>
							</>
						</RutaProtegidaMenus>
						<RutaProtegidaMenus path="/asignarActividadUsuario">
							<>
								<div id="wrapper">
									<AsignarActividadUsuario />
								</div>
							</>
						</RutaProtegidaMenus>

						<RutaProtegidaMenus path="/adminModulo">
							<>
								<div id="wrapper">
									<AdminModulo />
								</div>
							</>
						</RutaProtegidaMenus>

						<RutaProtegidaMenus path="/editarModulo">
							<>
								<div id="wrapper">
									<EditarModulo />
								</div>
							</>
						</RutaProtegidaMenus>
						<RutaProtegidaMenus path="/asignarActividadModulo">
							<>
								<div id="wrapper">
									<AsignarActividadModulo />
								</div>
							</>
						</RutaProtegidaMenus>
						<RutaProtegidaMenus path="/adminActividad">
							<>
								<div id="wrapper">
									<Actividad />
								</div>
							</>
						</RutaProtegidaMenus>
						<RutaProtegidaMenus path="/editarActividad">
							<>
								<div id="wrapper">
									<EditarActividad />
								</div>
							</>
						</RutaProtegidaMenus>
						<RutaProtegidaMenus path="/reportes">
							<>
								<div id="wrapper">
									<ContenidoReportes />
								</div>
							</>
						</RutaProtegidaMenus>
						<RutaProtegidaMenus path="/configuracion">
							<>
								<div id="wrapper">
									<Configuracion />
								</div>
							</>
						</RutaProtegidaMenus>

						<RutaProtegidaMenus path="/recuperarContrasena/:token">
							<>
								<div id="wrapper">
									<Recuperar />
								</div>
							</>
						</RutaProtegidaMenus>
						
						<Route component={NotFound} />
					</Switch>
				</Router>

			</Provider>
		);
	}

	_onAction(e) {
		//captura cualquier accion que realiza el usuario
		//console.log('user did something', e)
	}

	_onActive(e) {
		//captura la accion cuando el usuario pasa de estar inactivo a activo
		// console.log('user is active', e)
		// console.log('time remaining', this.idleTimer.getRemainingTime())
	}

	_onIdle(e) {
		//captura la accion despues pasados x minutos de inactividad
		// console.log('user is idle', e)
		// console.log('last active', this.idleTimer.getLastActiveTime())
		localStorage.setItem('Token', ' ');
		window.location.href = "/";
	}
}

function RutaProtegidaMenus({ children, ...rest }) {
	let atributo = false;
	let token = localStorage.getItem('Token');
	if (token !== ' ') {
		atributo = true;
	}
	return (
		<Route
			{...rest}
			render={({ location }) =>
				atributo ? (
					<>
						<MenuLateral />
						<MenuSuperior />
						{children}
					</>
				) : (
						<Redirect
							to={{
								pathname: "/"
							}}
						/>
					)
			}
		/>
	);
}


function RutaProtegida({ children, ...rest }) {
	let atributo = false;
	let token = localStorage.getItem('Token');
	if (token !== ' ') {
		atributo = true;
	}
	return (
		<Route
			{...rest}
			render={({ location }) =>
				atributo ? (
					children
				) : (
						<Redirect
							to={{
								pathname: "/"
							}}
						/>
					)
			}
		/>
	);
}


export default App;
