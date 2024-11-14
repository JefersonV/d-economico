import React, { useEffect, useState } from 'react'
import { useStore } from '../providers/GlobalProvider'
import { FormGroup, Col, Label, Input } from 'reactstrap';
import Badge from '../components/Clientes/Badge';
import useDebounce from "../hooks/useDebounce";
// import SeachBarDrop from '../SearchDrop/SearchBarDrop';
import SeachBarDrop from '../components/SearchDrop/SearchBarDrop';
import TablePagos from '../components/Pagos/TablePagos';

function Customers(props) {
  const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
    /* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		props.setTitle("Pagos > Historial");
	}, []);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [dataPrestamos, setDataPrestamos] = useState([]);
  const [filteredPrestamos, setFilteredPrestamos] = useState([]);
  const [tipoPrestamo, setTipoPrestamo] = useState(""); // Estado para tipo de préstamo
  const getDatePrestamos = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/prestamos`);
      const data = await response.json();
      if(response.ok) {
        setDataPrestamos(data);
      }
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getDatePrestamos();
  }, []);

  useEffect(() => {
    console.info(dataPrestamos);
  }, [dataPrestamos]);

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

  // filtro select option
  useEffect(() => {
    // Filtrar préstamos según el tipo de préstamo seleccionado
    if (tipoPrestamo) {
        const prestamosFiltrados = dataPrestamos.filter(cliente =>
            cliente.prestamos && cliente.prestamos.some(prestamo => prestamo.idTipoPrestamo === tipoPrestamo)
        ).map(cliente => ({
            ...cliente,
            prestamos: cliente.prestamos.filter(prestamo => prestamo.idTipoPrestamo === tipoPrestamo)
        }));

        setFilteredPrestamos(prestamosFiltrados);
    } else {
        // Si no hay tipo seleccionado, mostrar todos los préstamos
        setFilteredPrestamos(dataPrestamos); 
    }
}, [tipoPrestamo, dataPrestamos]);

  const handleTipoChange = (event) => {
    setTipoPrestamo(event.target.value); // Actualiza el tipo de préstamo seleccionado
  };

  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <div className="container">
          <FormGroup row>
            <Col sm={4}>
            <Label for="input-nombre" sm={2}>
                Tipo
              </Label>
              <Input 
                type="select" 
                id="input-tipo" 
                name="tipo" 
                onChange={handleTipoChange}
              >
                <option value="" disabled>Seleccione un tipo de préstamo</option>
                <option value="1">Diario</option>
                <option value="2">Semanal</option>
                <option value="3">Quincenal</option>
                <option value="4">Mensual</option>
              </Input>
            </Col>

            {/* <Col sm={5}>
              <SeachBarDrop 
                itemSelected={itemSelected}
                setItemSelectedList={setItemSelectedList}
                // Data search = la data encontrada en la api
                clienteData={dataSearch}
                setNoDataCliente={setNoDataCliente}
                noDataCliente={noDataCliente}
                // Estado del input
                searchValueInput={searchValue}
                setSearchValueInput={setSearchValue}
                handleSearch={handleSearch}
                isLoadingSearch={isLoading}
              />
            </Col> */}
          </FormGroup>

          <div className="row">
            <TablePagos dataApi={filteredPrestamos} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Customers