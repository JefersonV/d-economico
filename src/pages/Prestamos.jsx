import React, { useState, useEffect } from 'react'
import { useStore } from '../providers/GlobalProvider'
import Searchbar from '../components/Searchbar'
import useDebounce from '../hooks/useDebounce';
import "../styles/button.css"; 
import { Link, Outlet } from 'react-router-dom';
import TablePrestamos from '../components/Prestamos/TablePrestamos';
import PagComponent from '../components/PagComponent';

function Customers(props) {
  const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
		/* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		// Para establecer en el módulo en el que nos encontramos
		props.setTitle("Préstamos");
	}, []);

  const URL_API = import.meta.env.VITE_BACKEND_URL;

  const [searchValue, setSearchValue] = useState("");

  const debouncedInputValue = useDebounce(searchValue, 1000);

  const [dataSearch, setDataSearch] = useState([]);

  const handleSearch = e => {

    setSearchValue(e.target.value);
  }

  const searchClientDataApi = async () => {
    try {
      // buscar cliente por nombre
      const response = await fetch(`${URL_API}/Cliente/search?nombre=${searchValue}`);
      const resultadoBusqueda = await response.json();
      setDataSearch(resultadoBusqueda);
      console.log(resultadoBusqueda);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDataPrestamos();
    console.info(dataPrestamosApi)
  }, [])

  /* useEffect(() => {
    searchClientDataApi();
  }, [debouncedInputValue]); */

  const [dataPrestamosApi, setDataPrestamosApi] = useState([]);	

  const getDataPrestamos = async () => {
    try {
      const response = await fetch(`${URL_API}/Prestamo/prestamos`);
      const dataApi = await response.json();
      setDataPrestamosApi(dataApi);
      console.info(dataPrestamosApi)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
                <Link color="primary" to="/prestamos/new">
                  <button className="button-v2">
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Registrar préstamo</span>
                  </button>
                </Link>
              </nav>

              {/* El Outlet es necesario para renderizar las rutas anidadas */}
              <Outlet />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TablePrestamos 
                dataPrestamosApi={dataPrestamosApi}
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
    </>
  );
}

export default Customers