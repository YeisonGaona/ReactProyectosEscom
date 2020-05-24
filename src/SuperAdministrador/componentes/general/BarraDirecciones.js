import React from 'react';

import "reactjs-popup";
import '../../css/business-casual.css'
import '../../css/estilos.css'
import '../../css/bootstrap.min.css'
import '../../css/menu.css'


class BarraDeDireccion extends React.Component {
    render() {
        return (
            <div style={{
                paddingTop: "5px",
                paddingRight: "43px",
                paddingLeft: "40px",
                paddingBottom: "0px"
            }}>
                <div className="col-md-12 alert shadow" style={fondoBoton}>
                    {this.props.texto}
                </div>
            </div>

        )
    }



}

const fondoBoton = {
    background: "white",
    fontSize: "14px",
    width: "100%",
    padding: "10px"

}




export default BarraDeDireccion;