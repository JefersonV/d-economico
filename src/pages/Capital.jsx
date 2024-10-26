import React, { useState, useEffect} from 'react'
import { useStore } from "../providers/GlobalProvider";
import { Table } from 'reactstrap';

function Capital(props) {
  const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
    /* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		props.setTitle("Capital");
	}, []); 

  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <div className="container">
          <div className="row">
            <div className="col col-md-5">
              <div className="card">
                <div className="card-header">
                  Capital
                </div>
                <div className="card-body">
                  <h5 className="card-title">Monitoreo de Capital</h5>
                  <p className="card-text">Aquí se mostrará el capital disponible en la caja.</p>
                </div>
              </div>
            </div>

            <div className="col col-md-5">
              <div className="card">
                <div className="card-header">
                  Ingresos
                </div>
                <div className="card-body">
                  <h5 className="card-title">Ingresos</h5>
                  <p className="card-text">Aquí se mostrarán los ingresos registrados en la caja.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <Table>
              
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Saldo Inicial</th>
                  <th>Operación</th>
                  <th>Acción</th>
                  <th>Monto</th>
                  <th>Saldo en Caja</th>
                  <th>Saldo Bruto</th>
                </tr>
              </thead>
            <tbody>
             
              <tr>
                <td>01/01/2021</td>
                <td>Q. 1000.00</td>
                <td>Ingreso</td>
                <td>Depósito</td>
                <td>Q. 1000.00</td>
                <td>Q. 2000.00</td>
                <td>Q. 2000.00</td>
              </tr>
              <tr>
                <td>01/01/2021</td>
                <td>Q. 2000.00</td>
                <td>Egreso</td>
                <td>Retiro</td>
                <td>Q. 500.00</td>
                <td>Q. 1500.00</td>
                <td>Q. 1500.00</td>
              </tr>
              <tr>
                <td>01/01/2021</td>
                <td>Q. 1500.00</td>
                <td>Ingreso</td>
                <td>Depósito</td>
                <td>Q. 2000.00</td>
                <td>Q. 3500.00</td>
                <td>Q. 3500.00</td>
              </tr>
              <tr>
                <td>01/01/2021</td>
                <td>Q. 3500.00</td>
                <td>Egreso</td>
                <td>Retiro</td>
                <td>Q. 500.00</td>
                <td>Q. 3000.00</td>
                <td>Q. 3000.00</td>
              </tr>
              <tr>
                <td>01/01/2021</td>
                <td>Q. 3000.00</td>
                <td>Ingreso</td>
                <td>Depósito</td>
                <td>Q. 1000.00</td>
                <td>Q. 4000.00</td>
                <td>Q. 4000.00</td>
              </tr>
            </tbody>
            </Table>

          </div>
        </div>
      </div>
    </>
  )
}

export default Capital