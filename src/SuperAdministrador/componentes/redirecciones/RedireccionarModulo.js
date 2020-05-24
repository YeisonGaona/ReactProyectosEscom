import React from 'react';
import { Redirect } from 'react-router-dom'

import AdminModulo from '../administrar/ContenidoAdminModulo'

class MyComponent extends React.Component {

    state={
        editar: false,
        asignar:false
    }

    cambiar=(objeto)=>{
        if(objeto==='e'){
            this.setState({editar:true,asignar:false})
        }

        if(objeto==='a'){
            this.setState({editar:false,asignar:true})
        }
    }

    render() {
        if(this.state.editar){
            return <Redirect to='/editarModulo' />;
        }

        if(this.state.asignar){
            return <Redirect to='/asignarActividadModulo' />;
        }

        return <AdminModulo cambiar={this.cambiar}/>
        
    }
}


export default MyComponent;