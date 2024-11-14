import React, { useState } from "react";
import { Table } from "reactstrap";	
import ModalPagoCliente from "./ModalPagoCliente";

function TablePagos({ dataApi }) {
  const [modalData, setModalData] = useState(null);

  const toggleModal = (prestamo) => {
    if (modalData && modalData.idPrestamo === prestamo.idPrestamo) {
      setModalData(null); // Cierra el modal si ya está abierto
    } else {
      setModalData(prestamo); // Abre el modal para el préstamo seleccionado
    }
  };

  console.info(dataApi);

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Fecha de vencimiento</th>
            <th>Capital prestado</th>
            <th>Tipo préstamo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {dataApi.map((cliente, index) =>
            cliente.prestamos.map((prestamo) => (
              <tr key={prestamo.idPrestamo}>
                <td>{index + 1}</td>
                <td>{cliente.nombre} {cliente.apellido}</td>
                <td>{new Date(prestamo.fechaVencimiento).toLocaleDateString()}</td>
                <td>{prestamo.monto}</td>
                <td>{prestamo.idTipoPrestamo}</td>
                <td>
                  <button onClick={() => toggleModal(prestamo)}>Abrir Modal</button>
                  {modalData && modalData.idPrestamo === prestamo.idPrestamo && (
                    <ModalPagoCliente 
                      idPrestamo={cliente.idCliente} 
                      toggleModal={() => setModalData(null)} 
                    />
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}

export default TablePagos;