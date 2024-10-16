import React, { useState, useEffect } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';

function PagComponent(props) {
  //variable de entorno
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  // estado para los datos de la api segun la pagina
  const [data, setData] = useState([]);

  // determinar el numero de paginas a mostrar basado en la data de la api
  const [cantidadPaginas, setCantidadPaginas] = useState(0)

  // react router
  // Estado para la página actual
  const { page } = useParams(); // Obtén la página de los parámetros de la URL
  const navigate = useNavigate();
  const paginaActual = parseInt(page) || 1; // Si `page` es undefined, usa 1
  useEffect(() => {
    fetchData(paginaActual); // Cargar datos cuando cambia la página actual
  }, [paginaActual]); // Dependencia de `paginaActual`

  useEffect(() => {
    if (props.dataApi) {
      setCantidadPaginas(props.dataApi?.totalPages);
    }
  }, [props.dataApi]);

  // Determinar el número de páginas a mostrar
  const mostrarPaginas = () => {
    const rangoDePaginas = 5;
    const inicio = Math.max(1, paginaActual - Math.floor(rangoDePaginas / 2));
    const fin = Math.min(cantidadPaginas, inicio + rangoDePaginas - 1);

    const paginas = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  };

  const handlePageChange = (numeroPagina) => {
    // Cambiar la URL a la nueva página
    navigate(`/clientes/${numeroPagina}`); // Asegúrate de que la ruta sea correcta
  };

  const fetchData = async (pagina) => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Cliente?page=${pagina}`);
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }
      const result = await response.json();
      setData(result.data); // Asume que los datos están en `result.data`
      setCantidadPaginas(result.totalPages); // Asegúrate de que `totalPages` esté presente
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchData(paginaActual); // Cargar datos iniciales en el montaje
    // Actualizar la URL
     
  }, []);

  return (
    <>
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={paginaActual === 1}>
          <PaginationLink first href="#" onClick={() => handlePageChange(1)} />
        </PaginationItem>
        <PaginationItem disabled={paginaActual === 1}>
          <PaginationLink href="#" previous onClick={() => handlePageChange(paginaActual - 1)} />
        </PaginationItem>
        
        {mostrarPaginas().map((pagina) => (
          <PaginationItem key={pagina} active={pagina === paginaActual}>
            <PaginationLink href="#" onClick={() => handlePageChange(pagina)}>
              {pagina}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={paginaActual === cantidadPaginas}>
          <PaginationLink href="#" next onClick={() => handlePageChange(paginaActual + 1)} />
        </PaginationItem>
        <PaginationItem disabled={paginaActual === cantidadPaginas}>
          <PaginationLink last href="#" onClick={() => handlePageChange(cantidadPaginas)} />
        </PaginationItem>
      </Pagination>
    </>
  );
}

export default PagComponent