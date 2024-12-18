/* Correspondiente al módulo de clientes */
import React, { useEffect, useState } from 'react'
import { Formik, ErrorMessage } from "formik";
import { Button, Col, FormGroup, Input, Label, ModalFooter } from "reactstrap";
import { Form } from "formik";
import Swal from "sweetalert2";
function TabEditItem1(props) {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  // const { idCliente, actualizarListaCliente } = props;
  // console.log(props);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    telefono2: "",
    // dpi: "",
    ingresos: "",
    egresos: "",
    profesion: "",
    sexo: "",
    usuarioIdusuario: 3,
  });

  const getclienteData = async (id) => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Cliente/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const clienteData = await response.json();
      // console.info(clienteData);
      setData({
        ...data,
        nombre: clienteData.nombre || "",
        apellido: clienteData.apellido || "",
        direccion: clienteData.direccion || "",
        telefono: clienteData.telefono || "",
        telefono2: clienteData.telefono2 || "",
        // dpi: clienteData.dpi || "",
        ingresos: clienteData.ingresos || "",
        egresos: clienteData.egresos || "",
        profesion: clienteData.profesion || "",
        sexo: clienteData.sexo || "",
        usuarioIdusuario: 3,
      });
    } catch (error) {
      console.log("Error Message: " + error.ErrorMessage);
    }
  };

  useEffect(() => {
    if (props.idCliente) {
      getclienteData(props.idCliente);
    }
  }, [props.idCliente]);

  const handleSubmit = async (values, { resetForm }) => {

    /* Para la solicitud put */
    const bodyCliente = {
      nombre: values.nombre || "",
      apellido: values.apellido || "",
      direccion: values.direccion || "",
      telefono: values.telefono || "",
      telefono2: values.telefono2 || "",
      ingresos: values.ingresos || "",
      egresos: values.egresos || "",
      profesion: values.profesion || "",
      // dpi: values.dpi || "",
      sexo: values.sexo || "",
      usuarioIdusuario: values.usuarioIdusuario || 3,
    };

    cambiarFormularioEnviado(true);
    setTimeout(() => cambiarFormularioEnviado(false), 5000);
    resetForm();

    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Cliente/${props.idCliente}`,
        {
          method: "PUT",
          body: JSON.stringify(bodyCliente),
          headers: {
            // Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      // console.log(response.ok);
      if (response.ok) {
        // setModal(false);
        /* Alert */
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registro actualizado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        cambiarFormularioEnviado(true);
        setTimeout(() => cambiarFormularioEnviado(false), 5000);
        resetForm();
        /* Prop para actualizar la data de la tabla */
        // actualizarListaUsuario();
        props.actualizarListaCliente();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

    /* if (!valores.telefono) {
      errores.telefono = 'Por favor ingresa un número de teléfono';
    } else  */
    if (valores.telefono && !/^\d{8,10}$/.test(valores.telefono)) {
      errores.telefono = 'El teléfono debe tener entre 8 y 10 dígitos';
    }

    /* if (!valores.telefono2) {
      errores.telefono2 = 'Por favor ingresa un número de teléfono';
    } else  */if (valores.telefono2 && !/^\d{8,10}$/.test(valores.telefono2)) {
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

    if (!valores.sexo) {
      errores.sexo = 'Por favor selecciona un sexo';
    }


    return errores;
  };

  return (
    <>
      <Formik
        initialValues={{
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          direccion: data.direccion || "",
          telefono: data.telefono || "",
          telefono2: data.telefono2 || "",
          ingresos: data.ingresos || "",
          egresos: data.egresos || "",
          profesion: data.profesion || "",
          sexo: data.sexo || "",
          usuarioIdusuario: 3,
        }}
        /* props de validación y envío */
        enableReinitialize={true}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {/* 
        
        */}
        {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
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
                  /* invalidar en caso de */
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
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </Input>
                {touched.sexo && errors.sexo && <div className="error">{errors.sexo}</div>}
              </Col>

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
              
            </FormGroup>
            {/* {console.log(errors)} */}
            <Button
              color="primary"
              type="submit"
              disabled={formularioEnviado}
            >
              {formularioEnviado ? "Enviando..." : "Guardar Cambios"}
            </Button>
            {/* <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button> */}
            {formularioEnviado && <p className="exito">Formulario enviado con éxito</p>}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default TabEditItem1;