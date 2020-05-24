import React from 'react';
import { Redirect } from 'react-router-dom'

import Actividad from '../administrar/ContenidoAdminActividad.js'

class MyComponent extends React.Component {

    state={
        inicio: false
    }

    cambiar=(objeto)=>{
        if(objeto==='e'){
            this.setState({inicio:true})
        }
    }

    render() {
        if(this.state.inicio){
            return <Redirect to='/inicio'/>;
        }

        return <Actividad cambiar={this.cambiar}/>
        
    }
}


export default MyComponent;