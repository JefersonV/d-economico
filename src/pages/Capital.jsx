import React, { useState, useEffect } from 'react';
import { useStore } from "../providers/GlobalProvider";
import { Table } from 'reactstrap';

function Capital(props) {
  const isOpen = useStore((state) => state.sidebar);

  useEffect(() => {
    /* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
    props.setTitle("Capital");
  }, [props]); // Agregar props como dependencia para evitar warnings

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [dataCapital, setDataCapital] = useState(0); // Inicializar como 0
  const [dataCapitalRecuperado, setDataCapitalRecuperado] = useState(0); // Inicializar como 0

  const getCapitalPrestado = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/suma`);
      const data = await response.json();
      if (response.ok) {
        setDataCapital(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCapitalRecuperado = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/suma-capital-recuperado`);
      const data = await response.json();
      if (response.ok) {
        setDataCapitalRecuperado(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCapitalPrestado();
    getCapitalRecuperado();
  }, []); // Llamar ambas funciones en un solo useEffect

  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <div className="container">
          <div className="row mb-4">
            <div className="col col-md-5">
              <div className="card">
                <div className="card-header">
                  Capital
                </div>
                <div className="card-body">
                  <h5 className="card-title">Capital prestado</h5>
                  <p className="card-text">Q.{dataCapital !== null && dataCapital !== undefined ? dataCapital.toFixed(2) : "0.00"}</p>
                </div>
              </div>
            </div>

            <div className="col col-md-5">
              <div className="card">
                <div className="card-header">
                  Ingresos
                </div>
                <div className="card-body">
                  <h5 className="card-title">Capital recuperado</h5>
                  <p className="card-text">Q.{dataCapitalRecuperado !== null && dataCapitalRecuperado !== undefined ? dataCapitalRecuperado.toFixed(2) : "0.00"}</p>
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
                {dataCapital && dataCapital.length > 0 ? (
                  dataCapital.map((item, index) => (
                    <tr key={index}>
                      <td>{item.fecha || "N/A"}</td>
                      <td>Q. {item.saldoInicial !== null ? item.saldoInicial.toFixed(2) : "0.00"}</td>
                      <td>{item.operacion || "N/A"}</td>
                      <td>{item.accion || "N/A"}</td>
                      <td>Q. {item.monto !== null ? item.monto.toFixed(2) : "0.00"}</td>
                      <td>Q. {item.saldoCaja !== null ? item.saldoCaja.toFixed(2) : "0.00"}</td>
                      <td>Q. {item.saldoBruto !== null ? item.saldoBruto.toFixed(2) : "0.00"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No data available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Capital;