import React, { useState, useEffect } from 'react'
import Searchbar from '../Searchbar'
import { Button } from "reactstrap";	
import ModalAddClient from './ModalAddClient';
import Badge from "./Badge"
// import "../../styles/Badge.scss";
import "../../styles/Searchbar.scss";
import useDebounce from "../../hooks/useDebounce";
import SearchResults from '../SearchDrop/SearchResults';
import SeachBarDrop from '../SearchDrop/SearchBarDrop';
function CustomerStep1() {

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

  useEffect(() => {
    console.info(isLoading)
  }, [searchValue])

  // buscador fetch api
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

  // console.log(itemSelected)
  const [noDataMenu, setNoDataMenu] = useState(false);
  // data del cliente
  const [clienteEncontrado, setClienteEncontrado] = useState([])

  // esto va  en la solicitud fetch
  const [noDataCliente, setNoDataCliente] = useState(false);

  // Estado para identificar al cliente seleccionado
  const [clienteSelected, setClienteSelected] = useState([]);

  // Identifica el item de <searchbardrop> seleccionado -> prop al componente nieto :v
  const setItemSelectedList = (id) => {
    // Busca el item que coincida entre dataSearch e ItemSelected
    const selectedItem = dataSearch.find((item) => item.idcliente === id);
    
    if (!selectedItem) return; // Si no se encuentra el item, no hacer nada

    // Establece el item seleccionado y reemplaza el cliente seleccionado anterior
    setItemSelected(id);
    // Reemplaza con el nuevo item seleccionado
    setClienteSelected([selectedItem]); 

    console.log('Cliente seleccionado:', selectedItem);
  };
  
  return (
    <>
      <div className="container-fluid m-auto">
        <div className="d-flex justify-content-center row">
          <div className="col-12 col-md-6">
            {/* Falta en onchange de los props*/}
            <Searchbar 
              placeholder="nombre del cliente.."
              onChange={handleSearch}
              value={searchValue}
              name="search"
            /> 
            {/* {dataSearch.length > 0 && (
              <SearchResults data={dataSearch} />   
            )} */}
            <SeachBarDrop 
              itemSelected={itemSelected}
              setItemSelectedList={setItemSelectedList}
              clienteData={dataSearch}
              setNoDataCliente={setNoDataCliente}
              noDataCliente={noDataCliente}
              searchValueInput={searchValue}
              setSearchValueInput={setSearchValue}
              handleSearch={handleSearch}
              isLoadingSearch={isLoading}
            />
            {/* <div class="results">s</div> */}
          </div>
          <div className="col-12 col-md-6 mb-4">
            <ModalAddClient />
          </div>
          {/* Badge */}
          <Badge /> 
        </div>
      </div>
    </>
  )
}

export default CustomerStep1