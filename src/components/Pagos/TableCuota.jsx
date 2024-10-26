import React from "react";
import { Table, Badge } from "reactstrap";	
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function TableCuota({ data }) {

  console.info(data)
  return (
    <>
      <Table hover bordered responsive>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Cuota</th>
            <th>Fecha vencimiento</th>
            <th>Importe por cuota</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {data.cuotas && data.cuotas.map((cuota, index) => (
            <tr key={cuota.idPago}>
              {/* <td>{index + 1}</td> */}
              <td>
                <Badge
                  color="info"
                  pill
                >
                  Cuota {cuota.numeroCuota}
                </Badge>
              </td>
              <td>{new Date(cuota.fechaVencimientoCuota).toLocaleDateString()}</td>
              <td><b>Monto:</b> Q.{cuota?.montoCuota.toFixed(2) || ""} 
                <br /><b>Intereses:</b> Q.{cuota?.interesCuota.toFixed(2) || ""} 
                <br /><b>Total:</b> Q.{cuota?.montoCuota + cuota?.interesCuota || ""}  
              </td>
              <td>{cuota.estadoCuota ? "Pagado" : "Pendiente"}</td>
              <td>
                <nav>
                  <Link to="/pagos/pago-cuota">
                    <FaEye /> 
                  </Link>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableCuota;