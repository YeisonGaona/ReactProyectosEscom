import React from 'react';

import '../../css/menu.css'
import '../../css/registro.css'

import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form';
import Alert from '@material-ui/lab/Alert';
import { actionValidarToken, actionCambiarContrasenaExterna, actualizarMensajeRecuperarContrasena } from '../../actions/actionsUsuario.js'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RenderPasword from '../../utilitario/GenerarInputs';
import { requerido, contrasena } from '../../utilitario/validacionCampos.js';

class Recuperar extends React.Component {

    state = {
        habilitado: false,
        recuperar: false,
        severidad: 'error'
    }
    componentDidMount() {
        if (this.props.match.params.token === undefined | this.props.match.params.token.length < 130) {
            this.props.history.push('/');
        } else {
            this.props.actionValidarToken(this.props.match.params.token);
        }
    }

    componentDidUpdate() {
        switch (this.props.mensaje) {
            case 'Correcto':
                if (!this.state.recuperar) { this.setState({ recuperar: true }) }
                this.props.actualizarMensajeRecuperarContrasena('');
                break;
            case 'Contraseña actualizada':
                if (this.state.recuperar) { this.setState({ recuperar: false }) }
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                break;
            case 'No se encontro un correo asociado':
                if (this.state.severidad !== 'error') {
                    this.setState({ severidad: 'error' });
                }
                break;
            case 'Se vencio el plazo de 24h genere una nueva solicitud':
                if (this.state.severidad !== 'warning') {
                    this.setState({ severidad: 'warning' });
                }
                break;
            case 'Ocurrio un problema con la solicitud intentelo de nuevo':
                if (this.state.severidad !== 'error') {
                    this.setState({ severidad: 'error' });
                }
                break;
            case 'El usuario no esta registrado':
                if (this.state.severidad !== 'error') {
                    this.setState({ severidad: 'error' });
                }
                break;
            case 'Ocurrio un error en el servidor':
                if (this.state.severidad !== 'error') {
                    this.setState({ severidad: 'error' });
                }
                break;
            case 'Servidor fuera de servicio temporalmente':
                if (this.state.severidad !== 'error') {
                    this.setState({ severidad: 'error' });
                }
                break;
            case 'Este enlace ya no es valido':
                if (this.state.severidad !== 'error') {
                    this.setState({ severidad: 'error' });
                }
                break;
            default:
                break;
        }
    }

    handleSubmitForm = values => {
        if (values.nuevaContrasena !== values.verificacionNueva) {
            this.props.actualizarMensajeRecuperarContrasena('Las contraseñas no coinciden');
            this.setState({ severidad: 'warning' });
        } else {
            this.props.actionCambiarContrasenaExterna(this.props.correo, values.nuevaContrasena, this.props.match.params.token);
        }
    }

    onClicKIniciar = event => {
        event.preventDefault();
        this.props.history.push('/');
    }


    render() {
        return (
            <div>
                <div className="container-fluid" style={{ background: "white" }}>
                    <div className="row no-gutter">

                        <div className="col-md-8 col-lg-6">
                            <div className="login d-flex align-items-center py-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-10 mx-auto">
                                            {this.state.recuperar ?
                                                <>
                                                    <Modal isOpen={true}
                                                        toggle={this.toggle}
                                                        className={this.props.className}
                                                        style={{ maxWidth: '400px', width: '50%', margin: '10px auto' }}
                                                    >
                                                        <ModalHeader toggle={this.toggle} className="center">Cambiar contraseña</ModalHeader>
                                                        <ModalBody>
                                                            <form onSubmit={this.props.handleSubmit(this.handleSubmitForm)}>
                                                                <Field name="nuevaContrasena" component={RenderPasword} validate={[requerido, contrasena]} label="Nueva contraseña" />
                                                                <Field name="verificacionNueva" component={RenderPasword} validate={[requerido, contrasena]} label="Confirmar nueva contraseña" />
                                                                <div className="row">
                                                                    <div className="col-sm-12">
                                                                        <Field name="mensaje" component={generarMensaje} type={this.state.severidad} label={this.props.mensaje} />
                                                                    </div>
                                                                </div>
                                                                <br />
                                                                <div className="row">
                                                                    <div className="col-sm-6" style={{ paddingLeft: "29px" }}>
                                                                        <Button
                                                                            style={{ background: 'gray', fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }}
                                                                            className="btn btn-dark"
                                                                            variant="contained"
                                                                            onClick={this.onClicKIniciar}
                                                                        >
                                                                            Iniciar sesion
															                    </Button>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <Button
                                                                            style={{ background: '#0E3D38', fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }}
                                                                            className="btn btn-dark"
                                                                            variant="contained"
                                                                            type="submit">
                                                                            Cambiar contraseña
															             </Button>
                                                                        <br />
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </ModalBody>
                                                    </Modal>
                                                </> :
                                                <>
                                                    <Modal isOpen={true}
                                                        toggle={this.toggle}
                                                        className={this.props.className}
                                                        size="col-md-6">
                                                        <ModalBody>
                                                            <div className="row">
                                                                <div className="col-sm-12 center">
                                                                    <Field name="mensaje" type={this.state.severidad} component={generarMensaje} label={this.props.mensaje} />
                                                                </div>
                                                            </div>
                                                            <br />
                                                            <div className="row">
                                                                <div className="col-sm-6" style={{ paddingLeft: "200px" }}>
                                                                    <Button
                                                                        style={{ background: '#0E3D38', color: "white", fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }}
                                                                        className="btn btn-dark"
                                                                        variant="contained"
                                                                        onClick={this.onClicKIniciar}
                                                                    >
                                                                        Aceptar
															                    </Button>
                                                                </div>
                                                            </div>
                                                        </ModalBody>
                                                    </Modal>

                                                </>

                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const generarMensaje = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <div>
            {label === undefined | label === '' ? <div></div> : <Alert draggable={true} severity={type}>{label}</Alert>}
        </div>
    </div>
)


function mapStateToProps(state) {
    return {
        mensaje: state.user.mensajeContrasenaExterna,
        correo: state.user.nombreUsuario
    }
}

let formulario = reduxForm({
    form: 'recuperarContrasena'
})(Recuperar)



export default withRouter(connect(mapStateToProps, { actionValidarToken, actionCambiarContrasenaExterna, actualizarMensajeRecuperarContrasena })(formulario));
