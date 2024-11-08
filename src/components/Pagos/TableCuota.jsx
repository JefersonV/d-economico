import React, { useState } from "react";
import { Table, Badge } from "reactstrap";	
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
// import PagoCuota from "../../pages/PagoCuota";
import ModalPagoCuota from "./ModalPagoCuota";
import Swal from "sweetalert2";
// import { Badge } from "reactstrap";
function TableCuota({ data, getDataCuotas}) {

  console.info(data)

  /* 
    {
    "idCliente": 36,
    "nombre": "Mario",
    "apellido": "Test presentacion",
    "fechaRegistro": "2024-11-06T01:41:23.241327",
    "telefono": 23982739,
    "idPrestamo": 19,
    "cuotas": [
        {
            "idPago": 109,
            "numeroCuota": 2,
            "montoCuota": 111.11111111111111,
            "interesCuota": 16.666666666666668,
            "moraCuota": null,
            "totalCuota": null,
            "estadoCuota": false,
            "estadoPago": false,
            "fechaVencimientoCuota": "2024-11-08T00:00:00",
            "fechaPagoCuota": null,
            "diasAtraso": 0
        },
    ]
}
  */
  return (
    <>
      <Table hover bordered responsive>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Cuota</th>
            <th>Fechas</th>
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
                  Cuota {cuota.numeroCuota }  
                </Badge>
              </td>
              <td> <b>Vencimiento:</b> <br/> {new Date(cuota.fechaVencimientoCuota).toLocaleDateString()} <br />
                <b>Pagado:</b> <br /> {cuota.fechaPagoCuota ? new Date(cuota.fechaPagoCuota).toLocaleDateString() : "Pendiente"}
              </td>
              <td><b>Monto:</b> Q.{cuota?.montoCuota.toFixed(2) || ""} 
                <br /><b>Intereses:</b> Q.{cuota?.interesCuota.toFixed(2) || ""} 
                <br /><b>Total:</b> Q.{cuota.montoCuota && (cuota.montoCuota + cuota?.interesCuota).toFixed(2) || ""}  
              </td>
              <td>{cuota.estadoPago ? "Pagado" : "Pendiente"}</td>
              <td>
                {cuota.estadoPago && cuota.estadoPago ? (
                  <Badge color="success" pill>
                    Pagado
                  </Badge>
                ) : (
                  <ModalPagoCuota 
                    idPago={cuota.idPago}
                    getDataCuotasApi={getDataCuotas}
                  />
                )}
               
                {/* <nav>
                  <Link to="/pagos/pago-cuota">

                    <FaEye />
                  </Link>
                </nav> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableCuota;