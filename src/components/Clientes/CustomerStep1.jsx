import React, { useState, useEffect } from 'react'
import Searchbar from '../Searchbar'
import { Button } from "reactstrap";	
import ModalAddClient from './ModalAddClient';
import Badge from "./Badge"
// import "../../styles/Badge.scss";
import "../../styles/Searchbar.scss";
import { useStoreCliente } from '../../providers/ClienteProvider';
//import UseStore from '../../providers/GlobalProvider';
import useDebounce from "../../hooks/useDebounce";
import SearchResults from '../SearchDrop/SearchResults';
import SeachBarDrop from '../SearchDrop/SearchBarDrop';
function CustomerStep1(props) {
  // actualizarRelacionesCliente

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL
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

    // Reemplaza con el nuevo item seleccionado
    // props.setClienteSeleccionado([selectedItem]); 
 
    // console.log('Cliente seleccionado:', selectedItem);
    // actualizarRelacionesCliente
    props.setClienteStep1(selectedItem);
    // props.actualizarRelacionesCliente(selectedItem);
    
    // props.setClienteSeleccionado(selectedItem);
  };
  
  return (
    <>
      <div className="container-fluid m-auto">
        <div className="d-flex justify-content-center row">
          <div className="col-12 col-sm-6">
            
            <SeachBarDrop 
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

          </div>
          <div className="col-12 col-sm-6 mt-3">
            <ModalAddClient />
          </div>
          {/* Badge */}
          <div className="mt-4">
            <Badge 
              // Usar optional chaining para evitar errores
              nombre={props.clienteStep1?.nombre} 
              apellido={props.clienteStep1?.apellido}
              fecha={props.clienteStep1?.fechaRegistro}
              direccion={props.clienteStep1?.direccion}
              telefono={props.clienteStep1?.telefono}
              ingreso={props.clienteStep1?.ingresos}
              egreso={props.clienteStep1?.egresos}
              referencias={props.clienteStep1?.notasVisita}
            /> 
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerStep1