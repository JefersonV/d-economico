import React, { useState, useEffect } from 'react'
import Searchbar from '../Searchbar'
import Badge from "./Badge"
import ModalAddFiador from './ModalAddFiador'
import SearchBarDrop from '../SearchDrop/SearchBarDrop'
import useDebounce from "../../hooks/useDebounce"

function CustomerStep2() {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

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
        const response = await fetch(`${VITE_BACKEND_URL}/Fiador/search?nombre=${searchValue}`);
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


  // ***** Lógica de la busqueda
  // Item seleccionado prop de <SearchBarDrop />
  const [itemSelected, setItemSelected] = useState(null);

  // esto va  en la solicitud fetch
  const [noDataCliente, setNoDataCliente] = useState(false);

  // Estado para identificar al cliente seleccionado
  const [clienteSelected, setClienteSelected] = useState([]);

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
    
    // props.setClienteSeleccionado(selectedItem);
  };

  return (
    <>
      <div className="container-fluid justify-content-center m-auto">
        <div className="row">
          <div className="col-12 col-md-6">
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
          </div>
          <div className="col-12 col-md-6 mb-4">
            <ModalAddFiador />
          </div>
          {/* Badge */}
          <Badge 
              // Usar optional chaining para evitar errores
              nombre={clienteSelected[0]?.nombre} 
              apellido={clienteSelected[0]?.apellido}
              fecha={clienteSelected[0]?.fechaRegistro}
              direccion={clienteSelected[0]?.direccion}
              telefono={clienteSelected[0]?.telefono}
              /* ingreso={clienteSelected[0]?.ingresos}
              egreso={clienteSelected[0]?.egresos}
              referencias={clienteSelected[0]?.notasVisita} */
            /> 
        </div>
      </div>
    </>
  )
}

export default CustomerStep2