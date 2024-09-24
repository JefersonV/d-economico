import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col, Input } from 'reactstrap';
import { Formik, Form } from 'formik';
import { BiEditAlt, BiFoodMenu } from 'react-icons/bi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import '../../styles/Formulario.scss';

function ModalAddClient() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    /* const bodyCliente = {
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    telefono2: '',
    ingresos: '',
    egresos: '',
    profesion: '',
    sexo: '',
    usuarioIdusuario: 3,
  } */
  /* Validaciones de los campos */
  const validate = (valores) => {
    let errores = {};
    if (!valores.nombre) {
      errores.nombre = 'Por favor ingresa un nombre';
    } else if (!/^(?!.*\s{2})[a-zA-ZÀ-ÿ\s]{1,25}$/.test(valores.nombre)) {
      errores.nombre =
      'El nombre debe tener un máximo de 25 caracteres, solo puede contener letras y espacios, y no puede tener dos espacios seguidos';
    }
    if (!valores.apellido) {
      errores.apellido = 'Por favor ingresa un apellido';
    } else if (!/^(?!.*\s{2})[a-zA-ZÀ-ÿ\s]{1,25}$/.test(valores.apellido)) {
      errores.apellido = 'El apellido debe tener un máximo de 25 caracteres, solo puede contener letras y espacios, y no puede tener dos espacios seguidos';
    }

    if (!valores.direccion) {
      errores.direccion = 'Por favor ingresa una dirección';
    } else if (!/^(?!.*\s{2})[a-zA-Z0-9À-ÿ\s,.-]{1,100}$/.test(valores.direccion)) {
      errores.direccion = 'La dirección debe tener un máximo de 100 caracteres, puede contener letras, números, espacios y los caracteres ,.-, y no puede tener dos espacios seguidos';
    }

    if (!valores.telefono) {
      errores.telefono = 'Por favor ingresa un número de teléfono';
    } else if (!/^\d{8,10}$/.test(valores.telefono)) {
      errores.telefono = 'El teléfono debe tener entre 8 y 10 dígitos';
    }

    if (!valores.telefono2) {
      errores.telefono2 = 'Por favor ingresa un número de teléfono';
    } else if (!/^\d{8,10}$/.test(valores.telefono2)) {
      errores.telefono2 = 'El teléfono debe tener entre 8 y 10 dígitos';
    }

    if (!valores.ingresos) {
      errores.ingresos = 'Por favor ingresa un monto';
    } else if (!/^\d+(\.\d{1,2})?$/.test(valores.ingresos)) {
      errores.ingresos = 'El ingreso debe ser un número válido con hasta dos decimales';
    }

    if (!valores.egresos) {
      errores.egresos = 'Por favor ingresa un monto';
    } else if (!/^\d+(\.\d{1,2})?$/.test(valores.egresos)) {
      errores.egresos = 'El egreso debe ser un número válido con hasta dos decimales';
    }

    if (!valores.profesion) {
      errores.profesion = 'Por favor ingresa una profesión';
    } else if (!/^(?!.*\s{2})[a-zA-ZÀ-ÿ\s]{1,50}$/.test(valores.profesion)) {
      errores.profesion = 'La profesión debe tener un máximo de 50 caracteres, solo puede contener letras y espacios, y no puede tener dos espacios seguidos';
    }

    if (!valores.idTipoUsuario) {
      errores.idTipoUsuario = 'Por favor selecciona un tipo de usuario';
    }

    if (!valores.sexo) {
      errores.sexo = 'Por favor selecciona un sexo';
    }
    return errores;
  };

  const handleSubmit = async (valores, { resetForm }) => {
    
    const bodyCliente = {
      nombre: valores.nombre,
      apellido: valores.apellido,
      direccion: valores.direccion,
      telefono: valores.telefono,
      telefono2: valores.telefono2,
      sexo: valores.sexo,
      // dpi: valores.dpi;
      ingresos: valores.ingresos,
      egresos: valores.egresos,
      profesion: valores.profesion,
    }
    // console.log(bodyCliente);
    try {
      const response = await fetch('https://localhost:5103/api/Cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyCliente)
      });

      /* if (response.status === 400) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'El nombre de usuario ya está registrado',
          showConfirmButton: false,
          timer: 2000
        });
      } */

      if (response.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        });

        cambiarFormularioEnviado(true);
        setTimeout(() => cambiarFormularioEnviado(false), 5000);
        resetForm();
      } else {
        console.log('Ha ocurrido un error al enviar el formulario');
      }
    } catch (error) {
      console.log('Ha ocurrido un error al enviar el formulario');
      console.log(error);
    }
  };

  return (
    <>
      <Button color="danger" outline onClick={toggle}>
        <BiEditAlt /> Nuevo Cliente 
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} centered={true} size='lg'>
        <ModalHeader toggle={toggle}>
          <BiFoodMenu size={30} /> Ingreso de nuevo Cliente
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              nombre: '',
              apellido: '',
              direccion: '',
              telefono: '',
              telefono2: '',
              ingresos: '',
              egresos: '',
              profesion: '',
              sexo: '',
              usuarioIdusuario: 3,
            }}
            /* props de validación y envío */
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
              <Form className="formulario" onSubmit={handleSubmit}>
                <FormGroup row>
                  <Col sm={6}>
                    <Label for="input-nombre" sm={2}>
                        Nombre
                    </Label>
                    <Input
                      type="text"
                      id="input-nombre"
                      name="nombre"
                      placeholder="Juan Pérez"
                      autoComplete="off"
                      value={values.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      /* Validación de campo */
                      valid={touched.nombre && !errors.nombre && values.nombre.length > 0}
                      /* validar en caso de */
                      invalid={touched.nombre && !!errors.nombre}
                    />
                    {/* Mensaje de error si aplica*/}
                    {touched.nombre && errors.nombre && <div className="error">{errors.nombre}</div>}
                  </Col>

                  <Col sm={6}>
                  <Label for="input-apellido" sm={2}>
                    Apellido
                  </Label>
                    <Input
                      type="text"
                      id="input-apellido"
                      name="apellido"
                      value={values.apellido}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.apellido && !errors.apellido && values.apellido.length > 0}
                      invalid={touched.apellido && !!errors.apellido}
                      
                    />
                    {touched.apellido && errors.apellido && <div className="error">{errors.apellido}</div>}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={12}>
                    <Label for="input-direccion" sm={2}>
                      Dirección
                    </Label>
                  </Col>
                  <Col sm={10}>
                    <Input
                      type="text"
                      id="input-direccion"
                      name="direccion"
                      placeholder=" calle, zona y referencias"
                      autoComplete="off"
                      value={values.direccion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.direccion && !errors.direccion && values.direccion.length > 0}
                      invalid={touched.direccion && !!errors.direccion}
                    />
                    {touched.direccion && errors.direccion && <div className="error">{errors.direccion}</div>}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={6}>
                    <Label for="input-telefono" sm={6}>Teléfono 1</Label>
                    <Input
                      type="text"
                      id="input-telefono"
                      name="telefono"
                      placeholder="12345678"
                      autoComplete="off" 
                      value={values.telefono}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.telefono && !errors.telefono && values.telefono.length > 0}
                      invalid={touched.telefono && !!errors.telefono}
                    />
                    {touched.telefono && errors.telefono && <div className="error">{errors.telefono}</div>}
                  </Col>

                  <Col sm={6}>
                    <Label for="input-telefono2" sm={6}>Teléfono 2</Label>
                    <Input
                      type="text"
                      id="input-telefono2"
                      name="telefono2"
                      value={values.telefono2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.telefono2 && !errors.telefono2 && values.telefono2.length > 0}
                      invalid={touched.telefono2 && !!errors.telefono2}
                    />
                    {touched.telefono2 && errors.telefono2 && <div className="error">{errors.telefono2}</div>}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={6}>
                    <Label for="select-sexo" sm={6}>
                      Sexo
                    </Label>
                    <Input
                      type="select"
                      id="select-sexo"
                      name="sexo"
                      value={values.sexo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.sexo && !errors.sexo && values.sexo.length > 0}
                      invalid={touched.sexo && !!errors.sexo}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="1">Masculino</option>
                      <option value="2">Femenino</option>
                    </Input>
                    {touched.sexo && errors.sexo && <div className="error">{errors.sexo}</div>}
                  </Col>
                  {/*
                  <Col sm={6}>
                   <Label for="input-dpi" sm={6}>
                    Número de DPI
                  </Label>

                  <Input
                    type="number"
                    id="input-dpi"
                    name="dpi"
                    value={values.dpi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    valid={touched.contrasenia && !errors.contrasenia && values.contrasenia.length > 0}
                    invalid={touched.contrasenia && !!errors.contrasenia} 
                  />
                  </Col> */}
                    {/* {touched.nombre && errors.nombre && <div className="error">{errors.nombre}</div>} */}
                    {/* {touched.contrasenia && errors.contrasenia && <div className="error">{errors.contrasenia}</div>} */}

                </FormGroup>

                <FormGroup row>
                  <Col sm={6}>
                    <Label for="input-ingresos" sm={6}>
                      Ingreso mensual
                    </Label>
                    <Input
                      type="text"
                      id="input-ingresos"
                      name="ingresos"
                      autoComplete="off" 
                      value={values.ingresos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.ingresos && !errors.ingresos && values.ingresos.length > 0}
                      invalid={touched.ingresos && !!errors.ingresos}
                    />
                    {touched.ingresos && errors.ingresos && <div className="error">{errors.ingresos}</div>}
                  </Col>

                  <Col sm={6}>
                  <Label for="input-egresos" sm={6}>
                    Egreso mensual
                  </Label>

                  <Input
                    type="text"
                    id="input-egresos"
                    name="egresos"
                    value={values.egresos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    valid={touched.egresos && !errors.egresos && values.egresos.length > 0}
                    invalid={touched.egresos && !!errors.egresos}
                  />
                  {touched.egresos && errors.egresos && <div className="error">{errors.egresos}</div>}
                  </Col>

                </FormGroup>

                <FormGroup row>
                  <Col sm={6}>
                    <Label for="input-profesion" sm={2}>
                      Profesion
                    </Label>

                    <Input
                      type="text"
                      id="input-profesion"
                      name="profesion"
                      placeholder=""
                      autoComplete="off"
                      value={values.profesion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.profesion && !errors.profesion && values.profesion.length > 0}
                      invalid={touched.profesion && !!errors.profesion}
                    />
                    {touched.profesion && errors.profesion && <div className="error">{errors.profesion}</div>}
                  </Col>

                  {/* <Col sm={6}>
                    <Label for="input-referencias" sm={6}>
                      Referencias de la visita
                    </Label>

                    <Input
                      type="text"
                      id="input-referencias"
                      name="referencias"
                      placeholder=""
                      autoComplete="off"
                      value={values.referencias}
                      onChange={handleChange}
                      onBlur={handleBlur}
                       valid={touched.nombre && !errors.nombre && values.nombre.length > 0}
                      invalid={touched.nombre && !!errors.nombre} 
                    />
                  </Col> */}
                  
                </FormGroup>
                
                <Button type="submit" color="primary" outline>
                  Registrar
                </Button>
                <Button color="secondary" onClick={toggle}>
                  Cancelar
                </Button>
                {formularioEnviado && <p className="exito">Formulario enviado con éxito</p>}
              </Form>
            )}
          </Formik>
        </ModalBody>
        {/* <ModalFooter></ModalFooter> */}
      </Modal>
    </>
  );
}

export default ModalAddClient;