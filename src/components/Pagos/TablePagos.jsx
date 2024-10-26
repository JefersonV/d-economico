import React from "react";
import { Table } from "reactstrap";	
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function TablePagos({ dataApi }) {

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Préstamo</th>
            <th>Fecha de vencimiento</th>
            <th>Capital prestado</th>
            <th>Tipo préstamo</th>
            <th>Capital Recuperado</th>
            <th>Usuario</th>
            <th>Acc</th>
          </tr>
        </thead>
        <tbody>
          {dataApi.map((cliente, index) => (
          cliente.prestamos.map((prestamo) => (
            <tr key={prestamo.idPrestamo}>
              <td>{index + 1}</td>
              <td>{cliente.nombre} {cliente.apellido}</td>
              <td>{prestamo.idPrestamo}</td>
              <td>{new Date(prestamo.fechaVencimiento).toLocaleDateString()}</td>
              <td>{prestamo.monto}</td>
              <td>{prestamo.idTipoPrestamo}</td>
              <td>{prestamo.capitalRecuperado}</td>
              <td>{prestamo.idUsuario}</td>
              <td>
                <Link to="/pagos/cliente/">
                  <FaEye /> Ver
                </Link>
              </td>
            </tr>
          ))
        ))}
         
        </tbody>
      </Table>
    </>
  );
}

export default TablePagos;
