import React, { useState, useEffect } from 'react';
import { useStore } from '../../providers/GlobalProvider';
import TableEstimacion from './TableEstimacion';
import { Form, Formik } from 'formik';	
import { Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import "../../styles/Form.scss";
import { FcDataSheet } from "react-icons/fc";
import { TbFileSpreadsheet } from "react-icons/tb";
import useDebounce from "../../hooks/useDebounce";
import SearchBarDrop from '../SearchDrop/SearchBarDrop';
import Swal from 'sweetalert2';
import { ca } from 'date-fns/locale';

function NewPrestamo(props) {
  const isOpen = useStore((state) => state.sidebar);
  
  useEffect(() => {
    props.setTitle("Nuevo Préstamo");
  }, []);

  const [prestamoData, setPrestamoData] = useState({});

  const validate = (valores) => { 
    let errores = {};
    if (!valores.cliente) {
      errores.cliente = 'Por favor ingresa un cliente';
    }
    // Agrega más validaciones según sea necesario
    return errores;
  };
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    console.info("Datos de préstamo actualizados:", prestamoData);
  }, [prestamoData]);
  const clearForm = (resetForm) => {
    resetForm(); // Limpia el formulario
    setPrestamoData({}); // Limpia el estado de prestamoData
  };

  /* BUSQUEDA ---------- */

  const [dataApi, setDataApi] = useState([])

  // Filtro de búsqueda
  // estado para el valor de búsqueda del input
  const [searchValue, setSearchValue] = useState("");
  // hook de debounce
  const debouncedInputValue = useDebounce(searchValue, 1200);
  // estado para los datos de la búsqueda que trae la api
  const [dataSearch, setDataSearch] = useState([]);
  // estado para el loader del componente hijo
  const [isLoading, setIsLoading] = useState(false);

  // función para manejar el cambio en el input de búsqueda
  const handleSearch = e => {
    if(e.target.value.trim() === "") {
      setNoDataCliente(false);
    }
    setSearchValue(e.target.value);
  }

  const searchClientDataApi = async () => {
    try {
      // buscar cliente por nombre
      // asegura que el valor de búsqueda no esté vacío
      if (debouncedInputValue) {
        const response = await fetch(`${VITE_BACKEND_URL}/Cliente/search?nombre=${searchValue}`);
        const resultadoBusqueda = await response.json();
        // pasa los datos de la búsqueda al estado
        setDataSearch(resultadoBusqueda);
        if(response.ok) { 
          // estado del loader
          setIsLoading(true);
        }
        console.log(resultadoBusqueda)
      } else {
        setDataSearch([]);
      }
        
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    searchClientDataApi();
  }, [debouncedInputValue]);
  // console.info(dataSearch);

  // ***** Lógica de la busqueda
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


  /* Registrar nuevo préstamo ---- */
  const handleSubmit = async (valores, { resetForm }) => {

    let valorSeleccionado = valores.tipoPrestamo;
    let auxTipoPrestamo = 0;
    // utilidad para saber el tipo de préstamo, el valor capturado es "mensual" y se necesita el valor en numero
    if(valorSeleccionado === "Mensual") {
      auxTipoPrestamo = 1;
    } else if(valorSeleccionado === "Quincenal") {
      auxTipoPrestamo = 2;
    } else if(valorSeleccionado === "Semanal") {
      auxTipoPrestamo = 3;
    } else if(valorSeleccionado === "Diario") {
      auxTipoPrestamo = 4;
    }

    const bodyPrestamo = {
      Monto: valores.monto,
      CantidadCuotas: valores.cuotas,
      DiasGracia: valores.dias_gracia,
      FechaPrimerPago: valores.fecha_primer_pago,
      // la fecha de vencimiento debe ser calculada automaticamente
      FechaVencimiento: "2025-01-01T00:00:00",
      TasaInteres: valores.TasaInteres,
      IdUsuario: 3,
      IdCliente: clienteSelected[0].idcliente,
      IdTipoPrestamo: auxTipoPrestamo
      
    }
    console.log(bodyPrestamo);
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/registrar-prestamo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPrestamo)
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
  }

  console.info(prestamoData);


  /* Data prestamos con ciente */
  const [prestamosClienteApi, setPrestamosClienteApi] = useState([]);

  const getDataPrestamosCliente = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/prestamos}`);
      const dataResponse = await response.json();

      if (response.ok) {
        setPrestamosClienteApi(dataResponse);
        console.info(prestamosClienteApi);
      }

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDataPrestamosCliente();
  } , [])

  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <div className="container">
          <Formik
            initialValues={{
              fecha: "",
              cliente: "",
              monto: "",
              cuotas: "",
              tipoPrestamo: "",
              dias_gracia: "",
              fecha_primer_pago: "",
              TasaInteres: "",
              mora: "",
              politica: "",
            }}
            // validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, resetForm }) => (
              <Form onSubmit={handleSubmit} id="prestamo">
                <div className="row form-container">
                  <div className="col-9 col-lg-5 form-top">
                    <div className="form-group">
                      <Label htmlFor="fecha">Fecha</Label>
                      <Input
                        type="date"
                        name="fecha"
                        className="form-control"
                        id="fechaRegistro"
                        placeholder="Escoge fecha"
                        onChange={(e) => {
                          handleChange(e); // Actualiza el formulario
                          setPrestamoData({ ...prestamoData, fecha: e.target.value }); // Actualiza prestamoData
                        }}
                        value={prestamoData?.fecha || ""}
                      />
                    </div>
                    <div className="form-control search-input-nombre">
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
                        <button>
                          <Link to="/clientes/requisitos">Nuevo Cliente</Link>
                        </button>  

                    </div>
                    <br />
                    <div className="form-group">
                      <Label htmlFor="monto">Monto solicitado</Label>
                      <Input
                        type="number"
                        name='monto'
                        className="form-control"
                        id="monto"
                        placeholder="Cantidad..."
                        onChange={(e) => {
                          handleChange(e); // Actualiza el formulario
                          setPrestamoData({ ...prestamoData, monto: e.target.value }); // Actualiza prestamoData
                        }}
                        value={prestamoData?.monto || ""}
                      />
                    </div>
                    <div className="form-group">
                      <Label htmlFor="cant-cuotas">Cantidad de cuotas</Label>
                      <Input
                        type="number"
                        className="form-control"
                        name="cuotas"
                        id="cant-cuotas"
                        onChange={(e) => {
                          handleChange(e); // Actualiza el formulario
                          setPrestamoData({ ...prestamoData, cuotas: e.target.value }); // Actualiza prestamoData
                        }}
                        value={prestamoData?.cuotas || ""}
                      />
                    </div>
                    <div className="form-group">
                      <Label htmlFor="tipoPrestamo">Tipo de préstamo</Label>
                      <Input
                        type="select"
                        id="select-tipo"
                        name="tipoPrestamo"
                        onChange={(e) => {
                          handleChange(e); // Actualiza el formulario
                          setPrestamoData({ ...prestamoData, tipoPrestamo: e.target.value }); // Actualiza prestamoData
                        }}
                        value={prestamoData?.tipoPrestamo || ""}
                      >
                        <option value="" disabled>
                          Seleccione una opción
                        </option>
                        <option value="Mensual">Mensual</option>
                        <option value="Quincenal">Quincenal</option>
                        <option value="Semanal">Semanal</option>
                        <option value="Diario">Diario</option>
                      </Input>
                    </div>
                    <div className="form-group">
                      <Label htmlFor="dias_gracia">Días de gracia</Label>
                      <Input
                        type="number"
                        className="form-control"
                        name="dias_gracia"
                        id="dias-gracia"
                        onChange={(e) => {
                          handleChange(e); // Actualiza el formulario
                          setPrestamoData({ ...prestamoData, dias_gracia: e.target.value }); // Actualiza prestamoData
                        }}
                        value={prestamoData?.dias_gracia || ""} // Actualiza prestamoData
                      />
                    </div>
                  </div>

                  <div className="col-9 col-lg-5 form-top">
                    <div className="form-group">
                      <Label htmlFor="fecha_primer_pago">Fecha del primer pago</Label>
                      <Input
                        type="date"
                        className="form-control"
                        id="fecha_primer_pago"
                        name='fecha_primer_pago'
                        onChange={(e) => {
                          handleChange(e); // Actualiza el formulario
                          setPrestamoData({ ...prestamoData, fecha_primer_pago: e.target.value }); // Actualiza prestamoData
                        }}
                        value={prestamoData?.fecha_primer_pago || ""}
                      />
                    </div>
                    <div className="form-group">
                      <Label htmlFor="TasaInteres">Tasa de Interés</Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="tasa"
                        placeholder="Cantidad en quetzales"
                        name="TasaInteres"
                        onChange={(e) => {
                          handleChange(e); // Actualiza el formulario
                          setPrestamoData({ ...prestamoData, TasaInteres: e.target.value }); // Actualiza prestamoData
                        }}
                        value={prestamoData?.TasaInteres || ""}
                      />
                    </div>
                    <div className="form-group">
                      <Label htmlFor="mora">Mora</Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="mora"
                        placeholder="Cantidad de mora"
                        name='mora'
                        onChange={(e) => {
                          handleChange(e); // Actualiza el formulario
                          setPrestamoData({ ...prestamoData, mora: e.target.value }); // Actualiza prestamoData
                        }}
                        value={prestamoData?.mora || ""}
                      />
                    </div>
                    <div className="form-group">
                      <Label htmlFor="politica">Política de amortización</Label>
                      <Input
                        type="select"
                        id="select-politica"
                        name="politica"
                        onChange={(e) => {
                          handleChange(e); // Actualiza el formulario
                          setPrestamoData({ ...prestamoData, politica: e.target.value }); // Actualiza prestamoData
                        }}
                        value={prestamoData?.politica || ""}
                      >
                        <option value="" disabled>
                          Seleccione una opción
                        </option>
                        <option value="Mensual">Mensual</option>
                        <option value="Quincenal">Quincenal</option>
                        <option value="Semanal">Semanal</option>
                      </Input>

                      <div className="flex-cont">
                        <div className="flex-cont-left">
                          <h6>Pagos por cuotas: </h6>
                          {/* Pagos por cuotas = monto */}
                        </div>
                        <div className="flex-cont-right">
                          <h6>Intereses totales: </h6>
                        </div>
                       
                        
                      </div>
                      <div className="flex-bottom">
                          <h6>Total a recuperar: </h6>
                        </div>
                    </div>
                  </div>
                </div>
                
                <div className="container m-auto">
                  <div className="row">
                    <div className="col d-flex justify-content-center">
                      <button type="button" className="button-v2">
                        <FcDataSheet size={30} className="svgIcon" />
                        Estimar préstamo
                      </button>
                      <button
                        type="button"
                        className="button-v2 button-right px-2"
                        onClick={() => clearForm(resetForm)} // Llama a clearForm
                      >
                        <FcDataSheet size={30} className="svgIcon" />
                        Limpiar campos
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-12 col-md-10">
                      <button className="button-v2" type="submit" form="prestamo">
                        <TbFileSpreadsheet size={25}/> Registrar préstamo sss
                      </button>

                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-10 m-auto">
                <TableEstimacion 
                  monto={prestamoData.monto}
                  cliente={prestamoData.cliente}
                  cuotas={prestamoData.cuotas}
                  tipoPrestamo={prestamoData.tipoPrestamo}
                  tasaInteres={prestamoData.TasaInteres}
                  fechaPrimerPago={prestamoData.fecha_primer_pago}
                  prestamosCliente={prestamosClienteApi}
                />
              </div>s
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPrestamo;