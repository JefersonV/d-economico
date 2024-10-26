import React from "react";
import { Table } from "reactstrap";	
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function TableCuota({ data }) {

  console.info(data)
  return (
    <>
      <Table hover bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Cuota</th>
            <th>Fecha vencimiento</th>
            <th>Importe por cuota</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {data.cuotas && data.cuotas.map((cuota) => (
            <tr key={cuota.idPago}>
              <td>{cuota.idPago}</td>
              <td>{cuota.numeroCuota}</td>
              <td>{new Date(cuota.fechaVencimientoCuota).toLocaleDateString()}</td>
              <td>{cuota.montoCuota}</td>
              <td>{cuota.estadoCuota ? "Pagado" : "Pendiente"}</td>
              <td>
                <Link to={`/cuotas/${cuota.idPago}`}>
                  <FaEye /> Ver Detalles
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableCuota;