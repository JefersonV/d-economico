import React, { useEffect, useState } from 'react'
import { useStore } from '../providers/GlobalProvider'

function PagoCuota(props) {
  const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
		/* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		// Para establecer en el módulo en el que nos encontramos
		props.setTitle("Pago de cuota");
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
  }, []);

  const [tercerCuota, setTercerCuota] = useState(null);
  useEffect(() => {
    // Verifica que `cuotas` tenga al menos 3 elementos antes de acceder al índice 2
    if (dataCuotas.cuotas && dataCuotas.cuotas.length > 2) {
      setTercerCuota(dataCuotas.cuotas[2]);
      console.log(tercerCuota);
    }
  }, [dataCuotas]);


  return (
    <>
    <div className={isOpen ? "wrapper" : "side"}>
      <div className="container">
        <p>Dias de pago atrasados: 0 </p>
        <div className="row border mb-4">
          <form action="">
            <p>Especifique la mora</p>
            <div className="form-group">
              <label htmlFor="mora">Mora</label>
              <input type="number" name="mora" id="mora" className="form-control" placeholder="Mora" />
            </div>

            <div className="form-group">
              
              <label htmlFor="descuento">Descuento</label>
              <input type="number" name="descuento" id="descuento" className="form-control" placeholder="Descuento" />

              <label htmlFor="">Registrar como abono de capital</label>
              <input type="checkbox" name="abono" id="abono" />
            </div>
          </form>

        </div>

        <div className="row">
          <div className="col col-md-4 border">
            <p>Mora acumulada</p>
            <hr />
            <p>Fecha de pago {tercerCuota && new Date(tercerCuota.fechaVencimientoCuota).toLocaleDateString('es-ES') || ""}</p>
            <hr />
            <p>
              Deuda pendiente: Q. {tercerCuota && tercerCuota.montoCuota * 4 || ""}
            </p>
            Cliente: <strong>Nombre del cliente</strong>

          </div>
          <div className="col col-md-8 border">
            <p>Cuota a pagar no. 3</p>
            {/* <p>Total de la cuota</p> */}
            <p>Monto por cuota: Q. {tercerCuota && tercerCuota.montoCuota.toFixed(2) || ""}</p>
            <p>intereses cuota: Q. {tercerCuota && tercerCuota.interesCuota.toFixed(2) || ""}</p>
            <p>Total a pagar {tercerCuota && tercerCuota.montoCuota + tercerCuota.interesCuota || ""} </p>

            <button type="submit" className="btn btn-primary">Pagar</button>
            <button className="btn btn-secondary">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PagoCuota