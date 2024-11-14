import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Col, Input } from 'reactstrap';
import { Formik, Form } from 'formik';
import { BiEditAlt, BiFoodMenu } from 'react-icons/bi';
import Swal from 'sweetalert2';
import '../../styles/Formulario.scss';

function ModalAddGasto() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Validaciones de los campos
  const validate = (valores) => { 
    let errores = {};
    if (!valores.motivoPago) {
      errores.motivoPago = 'Por favor ingresa un motivo de pago';
    }
    if (!valores.tipoDoc) {
      errores.tipoDoc = 'Por favor selecciona un tipo de documento';
    }
    if (!valores.monto) {
      errores.monto = 'Por favor ingresa un monto';
    } else if (isNaN(valores.monto) || valores.monto <= 0) {
      errores.monto = 'El monto debe ser un número positivo';
    }
    if (!valores.fechaPago) {
      errores.fechaPago = 'Por favor ingresa una fecha de pago';
    }

    return errores;
  };

  const handleSubmit = async (valores, { resetForm }) => {
    const bodyPago = {
      MotivoPago: valores.motivoPago,
      TipoDoc: valores.tipoDoc,  // ID del tipo de documento
      TipoDocNavigation: {
        Id: valores.tipoDoc,  // Debe coincidir con el tipo de documento
        Nombre: "Nombre del Tipo de Documento"  // Cambia esto según corresponda
      },
      Monto: parseFloat(valores.monto),  // Asegúrate de que sea un número
      FechaPago: valores.fechaPago,
    };

    console.log(bodyPago);
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Fiador`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPago)
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
          <BiFoodMenu size={30} /> Ingreso de nuevo pago
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              motivoPago: '',
              tipoDoc: 1,  // Puedes ajustar el valor inicial según sea necesario
              monto: '',
              fechaPago: '',
            }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
              <Form className="formulario" onSubmit={handleSubmit}>
                <FormGroup row>
                  <Col sm={12}>
                    <Label for="input-motivoPago" sm={2}>
                      Motivo de Pago
                    </Label>
                    <Input
                      type="text"
                      id="input-motivoPago"
                      name="motivoPago"
                      placeholder="Pago de capital"
                      autoComplete="off"
                      value={values.motivoPago}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.motivoPago && !errors.motivoPago && values.motivoPago.length > 0}
                      invalid={touched.motivoPago && !!errors.motivoPago}
                    />
                    {touched.motivoPago && errors.motivoPago && <div className="error">{errors.motivoPago}</div>}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={12}>
                    <Label for="input-tipoDoc" sm={2}>
                      Tipo de Documento
                    </Label>
                    <Input
                      type="select"
                      id="input-tipoDoc"
                      name="tipoDoc"
                      value={values.tipoDoc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.tipoDoc && !errors.tipoDoc}
                      invalid={touched.tipoDoc && !!errors.tipoDoc}
                    >
                      <option value="">Selecciona un tipo</option>
                      <option value="1">Tipo 1</option>
                      <option value="2">Tipo 2</option>
                      {/* Agrega más opciones según sea necesario */}
                    </Input>
                    {touched.tipoDoc && errors.tipoDoc && <div className="error">{errors.tipoDoc}</div>}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={12}>
                    <Label for="input-monto" sm={2}>
                      Monto
                    </Label>
                    <Input
                      type="number"
                      id="input-monto"
                      name="monto"
                      placeholder="800.00"
                      autoComplete="off"
                      value={values.monto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.monto && !errors.monto && values.monto.length > 0}
                      invalid={touched.monto && !!errors.monto}
                    />
                    {touched.monto && errors.monto && <div className="error">{errors.monto}</div>}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={12}>
                    <Label for="input-fechaPago" sm={2}>
                      Fecha de Pago
                    </Label>
                    <Input
                      type="date"
                      id="input-fechaPago"
                      name="fechaPago"
                      value={values.fechaPago}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.fechaPago && !errors.fechaPago}
                      invalid={touched.fechaPago && !!errors.fechaPago}
                    />
                    {touched.fechaPago && errors.fechaPago && <div className="error">{errors.fechaPago}</div>}
                  </Col>
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
      </Modal>
    </>
  );
}

export default ModalAddGasto;