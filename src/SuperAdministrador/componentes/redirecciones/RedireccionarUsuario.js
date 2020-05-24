import React from 'react';
import { Redirect } from 'react-router-dom'

import AdminUsuario from '../administrar/ContenidoAdminUsuario.js'
import Editar from '../editar/editarUsuario.js';

class MyComponent extends React.Component {

    state={
        editar: false,
        asignar:false,
        identificacion:''
    }

    guardarIdentificacion(identificacion){
        this.setState({identificacion:identificacion})
    }

    cambiar=(objeto)=>{
        if(objeto==='e'){
            this.setState({editar:true,asignar:false})
        }

        if(objeto==='a'){
            this.setState({editar:false,asignar:true})
        }

        if(objeto==='c'){
            this.setState({editar:false,asignar:false})
        }
    }

    render() {
        if(this.state.editar){
            return <Editar cambiar={this.cambiar} identificacion={this.state.identificacion}/>;
        }

        if(this.state.asignar){
            return <Redirect to='/asignarActividadUsuario' />;
        }

        return <AdminUsuario guardar={this.guardarIdentificacion} cambiar={this.cambiar}/>
        
    }
}


export default MyComponent;