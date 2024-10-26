import React from "react";
import { Table } from "reactstrap";	
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function TablePagos() {

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
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>
                <Link to="/pagos/cliente">
                  Navigate
                </Link>
              {/* 
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
              */}
            </td>
          </tr>
         
        </tbody>
      </Table>
    </>
  );
}

export default TablePagos;
