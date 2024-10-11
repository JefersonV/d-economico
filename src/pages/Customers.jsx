import React, { useEffect, useState } from 'react'
import { useStore } from '../providers/GlobalProvider'
import Searchbar from '../components/Searchbar';
import { Button, Pagination, Spinner } from "reactstrap";
import { FaRegAddressCard } from "react-icons/fa";
import TableClient from '../components/Clientes/TableClient';
import PagComponent from '../components/PagComponent';
import { Link } from 'react-router-dom';
import CustomizedSteppers from '../components/Clientes/CustomizedStepper';
import useDebounce from '../hooks/useDebounce';

function Customers(props) {
  const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
		/* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		// Para establecer en el módulo en el que nos encontramos
		props.setTitle("Clientes");
	}, []);
  //Variable de entorno para la URL de la API
  const URL_API = import.meta.env.VITE_BACKEND_URL;
  
  const [dataApi, setDataApi] = useState([]);

   // spinner
   const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await fetch(`${URL_API}/Cliente`);
      const data = await response.json();
      setDataApi(data); 
      // console.log(data);
      if (response.ok) {
        // console.log("response.ok")
        // console.log(response.ok)
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    setTimeout(() => {
      getData();
      // console.log(dataApi)
    }, 1000);
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const debouncedInputValue = useDebounce(searchValue, 1000);

  const [dataSearch, setDataSearch] = useState([]);

  const handleSearch = e => {

    setSearchValue(e.target.value);
  }

  const searchClientDataApi = async () => {
    try {
      const response = await fetch(`${URL_API}/Cliente/search?nombre=${searchValue}`);
      const resultadoBusqueda = await response.json();
      setDataSearch(resultadoBusqueda);
      console.log(resultadoBusqueda);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    searchClientDataApi();
  }, [debouncedInputValue]);

  return (
    <div>
    {isLoading ? 
      <div className={isOpen ? "wrapper" : "side"}>
        <div className="container-fluid">
          <div className="row justify-content-center mt-4">
            <Spinner color="secondary">
              Loading...
            </Spinner>
          </div>
        </div>
      </div>
    :
    <div className={isOpen ? "wrapper" : "side"}>
    <div className="container-fluid">
      <div className="row justify-content-center mt-4">
        <div className="col-4">
          <Searchbar 
            placeholder="nombre del cliente.."
            onChange={handleSearch}
            value={searchValue}
            name="search"
            />
        </div>
        <div className="col-4">
          <Link color="primary" to="/multiple">
            <FaRegAddressCard /> Agregar Cliente
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TableClient 
          dataApi={dataApi} 
          actualizarListaCliente={getData} 
          busqueda={dataSearch}/>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col">
          <PagComponent />
        </div>
      </div>
    </div>
  </div>
  }
  </div>
  );


}

export default Customers