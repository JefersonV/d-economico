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
import "../styles/button.css";
import { MdPersonAddAlt1 } from "react-icons/md";
import Loader from '../components/Loader';

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

  // estado para el valor de búsqueda del input
  const [searchValue, setSearchValue] = useState("");
  // hook de debounce
  const debouncedInputValue = useDebounce(searchValue, 1200);
  // estado para los datos de la búsqueda que trae la api
  const [dataSearch, setDataSearch] = useState([]);

  // función para manejar el cambio en el input de búsqueda
  const handleSearch = e => {
    setSearchValue(e.target.value);
  }

  const searchClientDataApi = async () => {
    try {
      // buscar cliente por nombre
      // asegura que el valor de búsqueda no esté vacío
      if (debouncedInputValue) {
        const response = await fetch(`${URL_API}/Cliente/search?nombre=${searchValue}`);
        const resultadoBusqueda = await response.json();
        // pasa los datos de la búsqueda al estado
        setDataSearch(resultadoBusqueda);
        // console.log(resultadoBusqueda);
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

  return (
    <div>
    {isLoading ? 
      <div className={isOpen ? "wrapper" : "side"}>
        <div className="container-fluid">
          <div className="row justify-content-center mt-4">
            <Loader />
          </div>
        </div>
      </div>
    :
    <div className={isOpen ? "wrapper" : "side"}>
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-12 col-md-6">
          <Searchbar 
            placeholder="nombre del cliente.."
            onChange={handleSearch}
            value={searchValue}
            name="search"
            />
        </div>
        <div className="col-12 col-md-6">
          <nav>
            <Link to="/clientes/requisitos">
              <button className="button" style={{ "--clr": "#004dc1" }}>
                  <span className="button-decor"></span>
                  <div className="button-content">
                      <div className="button__icon">
                        <MdPersonAddAlt1 color="white" size={20}/>
                      </div>
                      <span className="button__text">Requisitos cliente</span>
                  </div>
              </button>
            </Link>

          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <TableClient 
          dataApi={dataApi} 
          actualizarListaCliente={getData}
          /* Resultado de la busqueda */ 
          busqueda={dataSearch}
          /* Valor de la busqueda */
          busquedaTyping={searchValue}
          />
          
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
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