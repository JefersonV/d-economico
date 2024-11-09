// En PagComponent.js
import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function PagComponent({ dataApi, getData }) {
  const totalPages = dataApi?.totalPages || 1;
  const currentPage = dataApi?.currentPage || 1;

  // Función para generar las páginas
  const mostrarPaginas = () => {
    const rangoDePaginas = 5;
    const inicio = Math.max(1, currentPage - Math.floor(rangoDePaginas / 2));
    const fin = Math.min(totalPages, inicio + rangoDePaginas - 1);

    return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
  };

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink first onClick={() => getData(1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous onClick={() => getData(currentPage - 1)} />
      </PaginationItem>
      
      {mostrarPaginas().map((page) => (
        <PaginationItem key={page} active={page === currentPage}>
          <PaginationLink onClick={() => getData(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={() => getData(currentPage + 1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink last onClick={() => getData(totalPages)} />
      </PaginationItem>
    </Pagination>
  );
}

export default PagComponent;
