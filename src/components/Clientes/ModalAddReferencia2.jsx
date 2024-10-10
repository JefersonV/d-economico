import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col, Input } from 'reactstrap';
import { Formik, Form } from 'formik';
import { BiEditAlt, BiFoodMenu } from 'react-icons/bi';
import Swal from 'sweetalert2';
import '../../styles/Formulario.scss';

function ModalAddReferencia2() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [dataParentesco, setDataParentesco] = useState([]);

  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const getParentesco = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Parentesco`, {
        headers: {
          // Authorization: `Bearer ${localStorage.token}`,
          'application': 'application/json',
        },
      })
      
      const dataParentesco = await response.json();
      setDataParentesco(dataParentesco);
      console.info(dataParentesco)
    } catch (error) {
      console.log("Error Message: " + error.ErrorMessage);
    }
  }

  useEffect(() => {
    getParentesco();
  }, []);

  /* Validaciones de los campos */
  const validate = (valores) => { 
    let errores = {};
    if (!valores.nombre) {
      errores.nombre = 'Por favor ingresa un nombre';
    } else if (!/^(?!.*\s{2})[a-zA-ZÀ-ÿ\s]{1,25}$/.test(valores.nombre)) {
      errores.nombre =
      'El nombre debe tener un máximo de 25 caracteres, solo puede contener letras y espacios, y no puede tener dos espacios seguidos';
    }
    
    if (!valores.parentesco) {
      errores.parentesco = 'Por favor selecciona un parentesco';
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
    return errores;
  };

  const handleSubmit = async (valores, { resetForm }) => {
    
    const bodyParentesco = {
      nombre: valores.nombre,
      parentesco: valores.parentesco,
      direccion: valores.direccion,
      telefono: valores.telefono,
      telefono2: valores.telefono2
    }
    // console.log(bodyParentesco);
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Parentesco`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParentesco)
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
        <BiEditAlt /> Nuevo Fiador
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} centered={true} size='md'>
        <ModalHeader toggle={toggle}>
          <BiFoodMenu size={30} /> Ingreso de referencia Familiar
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              nombre: '',
              parentesco: '',
              direccion: '',
              telefono: '',
              telefono2: ''
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
                    <Label for="select-parentesco" sm={2}>
                      Parentesco
                    </Label>
                    <Input
                      type="select"
                      id="select-parentesco"
                      name="parentesco"
                      value={values.parentesco}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.parentesco && !errors.parentesco && values.parentesco.length > 0}
                      invalid={touched.parentesco && !!errors.parentesco}
                    >
                      <option value="" disabled>Seleccione el parentesco</option>
                      {dataParentesco.map((item) => {
                        return (
                          <option key={item.idparentesco} value={item.idParentesco}>
                            {item.nombre}
                          </option>
                        );
                      })}
                      
                    </Input>
                    {touched.parentesco && errors.parentesco && <div className="error">{errors.parentesco}</div>}

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
                      placeholder="calle, zona y referencias"
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

                <FormGroup row>
                  <Col sm={12}>
                    <Label for="input-telefono2" sm={6}>Teléfono 2</Label>
                    <Input
                      type="text"
                      id="input-telefono2"
                      name="telefono2"
                      placeholder="12345678"
                      autoComplete="off" 
                      value={values.telefono2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.telefono2 && !errors.telefono2 && values.telefono2.length > 0}
                      invalid={touched.telefono2 && !!errors.telefono2}
                    />
                    {touched.telefono2 && errors.telefono2 && <div className="error">{errors.telefono2}</div>}
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

export default ModalAddReferencia2;