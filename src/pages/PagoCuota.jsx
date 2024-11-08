import React, { useEffect, useState } from 'react'
import { useStore } from '../providers/GlobalProvider'
import { Badge } from 'reactstrap';

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
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/cuotas/36`);

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
    // if (dataCuotas.cuotas && dataCuotas.cuotas.length > 2) {
    //   setTercerCuota(dataCuotas.cuotas[2]);
    //   console.log(tercerCuota);
    // }
    console.info(dataCuotas);
  }, [dataCuotas]);

  /* 
    {
    "idCliente": 34,
    "nombre": "Mauricio",
    "apellido": "Fernández",
    "fechaRegistro": "2024-11-05T17:25:59.060327",
    "telefono": 45322342,
    "cuotas": [
        {
            "idPago": 96,
            "numeroCuota": 1,
            "montoCuota": 375,
            "interesCuota": 37.5,
            "moraCuota": null,
            "totalCuota": null,
            "estadoCuota": false,
            "fechaVencimientoCuota": "2024-10-30T00:00:00",
            "fechaPagoCuota": null
        },
    ]
}
  */

  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <form action="">
          <div className="container">
            <p>Dias de pago atrasados: 0 </p>
            <div className="row border mb-4">
              {/* <p>Especifique la mora</p> */}

              {/* <p>Estado de la cuota:{" "}
                {dataCuotas.cuotas[0].estadoCuota && dataCuotas.cuotas[0].estadoCuota ? (
                  <Badge color="danger" pill>
                    Vencido
                  </Badge>
                ) : (
                  <Badge color="info" pill>
                    Vigente
                  </Badge>
                )}</p> */}
              <label htmlFor="">
                Mora y descuento solo aplica si ha vencido la cuota, 
              </label>

              <div className="col col-md-4 form-group mb-4">
                <label htmlFor="mora">Mora</label>
                <input
                  type="number"
                  name="mora"
                  id="mora"
                  className="form-control"
                  placeholder="Mora"
                />
              </div>

              <div className="col col-md-4">
                <label htmlFor="descuento">Descuento</label>
                <input
                  type="number"
                  name="descuento"
                  id="descuento"
                  className="form-control"
                  placeholder="Descuento"
                />
              </div>
            </div>

            <div className="row">
              <div className="col col-md-4 border">
                <p>Mora acumulada: Q. 0.00</p>
                <hr />
                <p>Fecha de pago: {new Date().toLocaleDateString()}</p>
                <hr />
                {/* <p>
      Deuda pendiente: Q. {tercerCuota && tercerCuota.montoCuota * 4 || ""}
    </p> */}
                Cliente:{" "}
                <strong>
                  {dataCuotas?.nombre || ""} {dataCuotas?.apellido || ""}
                </strong>
              </div>
              <div className="col col-md-8 border">
                <p>
                  Cuota a pagar no. {dataCuotas?.cuotas?.[0]?.numeroCuota || ""}
                </p>
                {/* <p>Total de la cuota</p> */}
                <p>
                  Monto por cuota: Q.{" "}
                  {dataCuotas?.cuotas?.[0]?.montoCuota || "0.00"}
                </p>
                <p>
                  Intereses cuota: Q.{" "}
                  {dataCuotas?.cuotas?.[0]?.interesCuota || "0.00"}{" "}
                </p>
                <p>
                  Total a pagar: Q.{" "}
                  {dataCuotas?.cuotas?.[0]?.montoCuota &&
                  dataCuotas?.cuotas?.[0]?.interesCuota
                    ? (
                        dataCuotas.cuotas[0].montoCuota +
                        dataCuotas.cuotas[0].interesCuota
                      ).toFixed(2)
                    : "0.00"}
                  {(dataCuotas.fechaVencimientoCuota &&
                    new Date(
                      dataCuotas.fechaVencimientoCuota
                    ).toLocaleDateString()) ||
                    ""}
                </p>

                <button type="submit" className="btn btn-primary">
                  Pagar
                </button>
                <button className="btn btn-secondary">Cancelar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PagoCuota