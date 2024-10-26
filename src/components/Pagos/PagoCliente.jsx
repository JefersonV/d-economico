import React, { useState, useEffect} from 'react'
import { useStore } from "../../providers/GlobalProvider";
import Badge from "../Clientes/Badge";
import TableCuota from './TableCuota';

function PagoCliente(props) {
  const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
    /* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		props.setTitle("Pagos > Cuotas");
	}, []); 

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [dataCuotas, setDataCuotas] = useState([]);
  
  const getDataCuotas = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/cuotas/10`);

      const data = await response.json();
      if(response.ok) {
        setDataCuotas(data);
        
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getDataCuotas();
    // console.log(dataCuotas)
  }, []);

  useEffect(() => {
    console.log(dataCuotas); // This will log the updated dataCuotas after fetching
  }, [dataCuotas]);


  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <div className="container">
          <div className="row">
            <div className="col">
              <Badge />
            </div>
            
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col">
              <button className="btn btn-primary">Contrato</button>
              
            </div>
            <div className="col">
              <button className="btn btn-primary">Contrato</button>
            </div>
          </div>

          <div className="row">
            <div className="col col-lg-10 m-auto">
              <TableCuota data={dataCuotas} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PagoCliente