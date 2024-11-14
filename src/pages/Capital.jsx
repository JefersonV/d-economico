import React, { useState, useEffect } from 'react';
import { useStore } from "../providers/GlobalProvider";
import { Table } from 'reactstrap';
import ModalAddGasto from "../components/Capital/ModalAddGasto"
import ModalAddInyeccion from "../components/Capital/ModalAddInyeccion"

function Capital(props) {
  const isOpen = useStore((state) => state.sidebar);

  useEffect(() => {
    /* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
    props.setTitle("Capital");
  }, []); // Agregar props como dependencia para evitar warnings

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

  const [dataOperaciones, setDataOperaciones] = useState([]);	
  const getDataOperacioens = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/operaciones-de-la-semana`);
      const data = await response.json();
      if (response.ok) {
        setDataOperaciones(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCapitalPrestado();
    getCapitalRecuperado();
  }, []);

  useEffect(() => {
    getDataOperacioens();
    console.info(dataOperaciones);
  }, []);

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
            <div className="col col-md-6">
              <ModalAddGasto />
              <ModalAddInyeccion />
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Saldo Inicial</th>
                  <th>Operación</th>
                  <th>Acción</th>
                  <th>Monto</th>
                  {/* <th>Saldo Bruto</th> */}
                </tr>
              </thead>
              <tbody>
                {dataOperaciones && dataOperaciones.length > 0 ? (
                  dataOperaciones.map((item, index) => (
                    <tr key={index}>
                      <td>{item.fecha || "N/A"}</td>
                      <td>Q. {"0.00"}</td> {/* Saldo inicial no está disponible, puedes dejarlo así o eliminar la columna */}
                      <td>{item.tipoOperacion || "N/A"}</td>
                      <td>{item.descripcion || "N/A"}</td> {/* Aquí se utiliza 'descripcion', que es null */}
                      <td>Q. {item.monto !== null ? item.monto.toFixed(2) : "0.00"}</td>
                      
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