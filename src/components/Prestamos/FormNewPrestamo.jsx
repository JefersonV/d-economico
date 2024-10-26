import React, { useState, useEffect } from 'react'
import "../../styles/Form.scss"
import { Form, Formik } from 'formik'	
import { Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import SearchBarDrop from "../SearchDrop/SearchBarDrop"

function FormNewPrestamo() {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
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

  // Registrar préstamo

  const handleSubmit = async (valores, { resetForm }) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  } 

  // ***** Lógica de la busqueda -------------
  // Item seleccionado prop de <SearchBarDrop />
  const [itemSelected, setItemSelected] = useState(null);

  // esto va  en la solicitud fetch
  const [noDataCliente, setNoDataCliente] = useState(false);

  // Estado para identificar al cliente seleccionado
  const [clienteSelected, setClienteSelected] = useState([]);

  // Identifica el item de <searchbardrop> seleccionado -> prop al componente nieto :v
  let selectedItem = [];
  const setItemSelectedList = (id) => {
    // Busca el item que coincida entre dataSearch e ItemSelected
    selectedItem = dataSearch.find((item) => item.idcliente === id);
    
    if (!selectedItem) return; // Si no se encuentra el item, no hacer nada

    // Establece el item seleccionado y reemplaza el cliente seleccionado anterior
    setItemSelected(id);
    // Reemplaza con el nuevo item seleccionado
    setClienteSelected([selectedItem]); 
 
    console.log('Cliente seleccionado:', selectedItem);
  };
  return (
    <>
      <Formik
        initialValues={{
          fecha: '',
          cliente: '',
          monto: '',
          cuotas: '',
          tipoPrestamo: '',
          dias_gracia: '',

          // interes: '',
          // fechaVencimiento: '',
          // cliente: '',
          // cuotas: ''
        }}
        validate={validate}
        onSubmit={handleSubmit}
        /* onSubmit={values => {
          console.log(values)
        }} */
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row form-container">
              <div className="col col-md-5 form-top">
                
                <div className="form-group">
                  <Label htmlFor="Fecha">Fecha</Label>
                  <Input type="date" className="form-control" id="fecha" placeholder="Escoge fecha" />
                </div>

                  <SearchBarDrop 
                    itemSelected={itemSelected}
                    setItemSelectedList={setItemSelectedList}
                    /* Data search = la data encontrada en la api */
                    clienteData={dataSearch}
                    setNoDataCliente={setNoDataCliente}
                    noDataCliente={noDataCliente}
                    /* Estado del input */
                    searchValueInput={searchValue}
                    setSearchValueInput={setSearchValue}
                    handleSearch={handleSearch}
                    isLoadingSearch={isLoading}
                  />
                  {/* <Input type="search" className="form-control" id="searchCliente" placeholder="Nombre ..." /> */}
                  <nav>
                    <Link>Nuevo Cliente</Link>
                  </nav>
                

                <div className="form-group">
                  <Label htmlFor="monto">Monto solicitado</Label>
                  <Input type="search" className="form-control" id="monto" placeholder="Nombre ..." />
                </div>

                <div className="form-group">
                  <Label htmlFor="cant-cuotas">Cantidad de cuotas</Label>
                  <Input type="number" className="form-control" name="cuotas" id="cant-cuotas"/>
                </div>

                <div className="form-group">
                  <Label htmlFor="Tipo-prestamo">Tipo de préstamo</Label>
                  <Input
                      type="select"
                      id="select-tipo"
                      name="sexo"
                      value={values.sexo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid={touched.sexo && !errors.sexo && values.sexo.length > 0}
                      // invalid={touched.sexo && !!errors.sexo}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </Input>
                    {/* {touched.sexo && errors.sexo && <div className="error">{errors.sexo}</div>} */}
                </div>

                <div className="form-group">
                  <Label htmlFor="dias-gracia">Días de gracia</Label>
                  <Input type="number" className="form-control" name="dias_gracia" id="dias-gracia"/>

                </div>
              </div>

              <div className="col col-md-5 form-top">
                <div className="form-group">
                  <label htmlFor="Fecha">Fecha del primer pagoss</label>
                  <Input type="date" className="form-control" id="fecha" placeholder="Escoge fecha" />
                </div>
                <div className="form-group">
                  <Label htmlFor="Monto">Tasa de Interés</Label>
                  <Input type="number" className="form-control" id="monto" placeholder="cantidad en quetzales" name="monto"/>
                </div>
                {/* <div className="form-group">
                  <label htmlFor="searchCliente">Mora ????</label>
                  <Input type="search" className="form-control" id="searchCliente" placeholder="Nombre ..." />
                </div> */}

                {/* <div className="form-group">
                  <Label htmlFor="politica">Politica amortización</Label>
                  <Input
                      type="select"
                      id="select-tipo"
                      name="sexo"
                      value={values.sexo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid={touched.sexo && !errors.sexo && values.sexo.length > 0}
                      // invalid={touched.sexo && !!errors.sexo}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="Masculino">Mensual</option>
                      <option value="Femenino">Quincenal</option>
                      <option value="Femenino">Semanal</option>
                    </Input>
                    {touched.sexo && errors.sexo && <div className="error">{errors.sexo}</div>}
                </div> */}

                <div className="form-group">
                  <div>
                    <span>Pago de cada cuota</span>
                    <span>Intereses totales</span>
                  </div>
                  <div>
                    <span>Pago de cada cuota</span>
                    <span>Intereses totales</span>
                  </div>
                  <p>Monto total del préstamo</p>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      
    </>
  )
}

export default FormNewPrestamo