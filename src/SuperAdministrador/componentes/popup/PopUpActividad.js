import React from 'react';

import 'react-notifications/lib/notifications.css';


import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { generarInput, generarArea } from '../../utilitario/GenerarInputs.js'
import { seleccione, validacionCuarentaCaracteres, validacionDoscientosCaracteres, requerido } from '../../utilitario/validacionCampos.js';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';

import { actionConsultarModulos, actionConsultarActividades,actionConsultarCantidadActividades, actionAgregarActividad, actualizarMensajeRegistrar } from '../../actions/actionActividad.js'
import { connect } from 'react-redux';

class PopUpActividad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.props.reset();
    }

    componentWillMount() {
        this.props.actionConsultarModulos(localStorage.getItem('Token'));

    }

    componentDidUpdate() {
        switch (this.props.mensaje) {
            case 'actividad registrada':
                NotificationManager.success('Actividad registrada correctamente');
                this.props.actionConsultarActividades(localStorage.getItem('Token'), this.state.rowsPerPage, this.state.page);
                this.props.actionConsultarCantidadActividades(localStorage.getItem('Token'));
                this.props.actualizarMensajeRegistrar('');
                break;
            case 'Sin permiso':
                NotificationManager.error('No tiene permisos sucifientes para registrar una actividad');
                this.props.actualizarMensajeRegistrar('');
                break;
            case 'La actividad ya se encuentra registrada':
                NotificationManager.error('La actividad se encuentra registrada intente de nuevo con otro nombre');
                this.props.actualizarMensajeRegistrar('');
                break;
            case 'El modulo no se encuentra registrado':
                NotificationManager.error('El modulo seleccionado no se encuentra registrado');
                this.props.actualizarMensajeRegistrar('');
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

    opciones = () => {
        let respuesta = [];
        this.props.modulos.forEach(
            modulo => {
                let objeto = {
                    label: modulo.nombreModulo,
                    value: modulo.idModulo,
                }
                respuesta.push(objeto);
            }
        )
        return respuesta;
    }

    handleSubmit = formValues => {
        try {
            let actividad = {
                'nombre': formValues.nombre,
                'descripcionActividad': formValues.descripcion,
                'idModulo': formValues.modulo.value,
                'moduloActividad': formValues.modulo.label,
                'estado': 'Activo'
            };
            this.props.actionAgregarActividad(actividad, localStorage.getItem('Token'));
            this.props.reset();
        } catch (error) {
            NotificationManager.error('Ingrese todos los datos');
        }
    }


    render() {
        return (
            <div>
                <Button style={{ background: this.props.configuracion.botones, fontSize: "14px", textTransform: "none" }} startIcon={<AddIcon />} className="btn btn-dark" variant="contained" onClick={this.toggle}>Registrar actividad</Button>
                <Modal isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                    size="col-md-6"
                >
                    <ModalHeader toggle={this.toggle} className="center">Crear actividad</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="nombre" validate={[requerido, validacionCuarentaCaracteres]} component={generarInput} label="Nombre" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="descripcion" component={generarArea} filas={4} validate={[requerido, validacionDoscientosCaracteres]} label="Descripcion" />
                                </div>
                            </div>
                            <div className="row" style={{ paddingTop: "9px" }}>
                                <div className="col-sm-12">
                                    <Field name="modulo" validate={[seleccione]} component={ReduxFormSelect} options={this.opciones()} />
                                </div>
                            </div>
                            <ModalFooter>
                                <Button style={{ background: this.props.configuracion.botones, fontSize: "13px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" startIcon={<SaveAltIcon />} type="submit">Registrar</Button>{''}
                                <Button style={fondoBotonCancelar} className="btn btn-dark" variant="contained" startIcon={<CancelIcon />} onClick={this.toggle}>Cancelar</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </Modal>
                <NotificationContainer />
            </div>
        );
    }
}

export const ReduxFormSelect = props => {
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: 13
        }),
        control: styles => ({ ...styles, backgroundColor: 'white', fontSize: 13, fontFamily: 'sans-serif' }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            return { ...provided, opacity, transition };
        }
    }
    const { input, options } = props;
    const { touched, error } = props.meta;
    return (
        <>
            <Select
                {...input}

                styles={customStyles}
                isSearchable={false}
                placeholder='Seleccione un modulo'
                onChange={value => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                noOptionsMessage={() => 'Aun no hay ningun modulo registrado'}
                options={options}
            />
            {touched && ((error && <span className="text-danger form-group" style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>{error}</span>))}
        </>
    )
}
const fondoBotonCancelar = {
    background: "gray",
    fontSize: "13px",
    fontFamily: "sans-serif",
    textTransform: "none"
}

function mapStateToProps(state) {
    return {
        modulos: state.act.modulosActividades,
        mensaje: state.act.mensajeRegistrar,
        configuracion: state.conf.configuracion
    }
}

let formulario = reduxForm({
    form: 'registrarActividad'
})(PopUpActividad)

export default withRouter(connect(mapStateToProps, { actionConsultarModulos, actionConsultarActividades,actionConsultarCantidadActividades, actionAgregarActividad, actualizarMensajeRegistrar })(formulario));

