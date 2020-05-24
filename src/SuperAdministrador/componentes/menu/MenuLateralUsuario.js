import React from 'react';

//estilos
import '../../css/business-casual.css'
import '../../css/estilos.css'
import '../../css/bootstrap.min.css'
import '../../css/menu.css'

//imagenes
import home from '../../imagenes/icon-home.png';
import logo from '../../imagenes/logo.png'


class MenuLateralUsuario extends React.Component {

	state={
		hoverInicio:false
	}

	hoverOn=(evento)=>{
		this.setState({ [evento.target.name]: true });
	}

	hoverOff=(evento)=>{ 
		this.setState({ [evento.target.name]: false });    
	}

	render() {
		return (
			<div  id="sidebar-wrapper" className="toggled" style={fondoMenuLateral}>
				<div className="col-sm" style={fondoMenuLateral}>
					<div className="container text-center" style={fondoMenuLateral}>
						<img src={logo} alt="" width="140" height="60" />
					</div>
				</div>
				<li className="nav-item">
					<a href="/inicio" name="hoverInicio" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} className="list-group-item list-group-item-action text-light text-center"
					 style={ this.state.hoverInicio ? fondoHover : fondoMenuLateral } >
						<img src={home} alt="" width="25" height="25" />
						<br />
						<span className="title">Inicio</span>
					</a>
				</li>
			</div>

		)
	}
}

const fondoMenuLateral = {
	background: "#26344B",
	fontSize: "14px",
	fontFamily: "Open sans, sans-serif"

}

const fondoHover = {
	background: "#2b3b55",
	fontSize: "14px",
	fontFamily: "Open sans, sans-serif"

}


export default MenuLateralUsuario;