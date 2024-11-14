import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col, Input } from 'reactstrap';
import { Formik, Form } from 'formik';
import { BiEditAlt, BiFoodMenu } from 'react-icons/bi';
import Swal from 'sweetalert2';
import '../../styles/Formulario.scss';

function ModalAddGasto() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  /* Validaciones de los campos */
  const validate = (valores) => { 
    let errores = {};
    if (!valores.nombre) {
      errores.nombre = 'Por favor ingresa un nombre';
    } else if (!/^(?!.*\s{2})[a-zA-ZÀ-ÿ\s]{1,25}$/.test(valores.nombre)) {
      errores.nombre =
      'El nombre debe tener un máximo de 25 caracteres, solo puede contener letras y espacios, y no puede tener dos espacios seguidos';
    }
    if (valores.apellido && !/^(?!.*\s{2})[a-zA-ZÀ-ÿ\s]{1,25}$/.test(valores.apellido)) {
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
    return errores;
  };

  const handleSubmit = async (valores, { resetForm }) => {
    
    const bodyCliente = {
      nombre: valores.nombre,
      apellido: valores.apellido,
      direccion: valores.direccion,
      telefono: valores.telefono,
    }
    console.log(bodyCliente);
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Fiador`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyCliente)
      });

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
        <BiEditAlt /> Registrar gasto
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} centered={true} size='md'>
        <ModalHeader toggle={toggle}>
          <BiFoodMenu size={30} /> Ingreso de nuevo Fiador
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              nombre: '',
              apellido: '',
              direccion: '',
              telefono: '',
            }}
            /* props de validación y envío */
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
              <Form className="formulario" onSubmit={handleSubmit}>
                <FormGroup row>
                  <Col sm={12}>
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
                      /* invalidar en caso de */
                      invalid={touched.nombre && !!errors.nombre}
                    />
                    {/* Mensaje de error si aplica*/}
                    {touched.nombre && errors.nombre && <div className="error">{errors.nombre}</div>}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={12}>

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
                  <Col sm={12}>
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
                  <Col sm={12}>
                    <Label for="input-telefono" sm={6}>Teléfono</Label>
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

                </FormGroup>
                {/* {console.log(errors)} */}
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

export default ModalAddGasto;