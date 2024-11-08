import { useEffect } from 'react';
// import React, useEffect from 'react'
import { useStore } from '../providers/GlobalProvider'
function Reportes(props) {
  const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
    /* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		props.setTitle("Pagos > Historial");
	}, []);
  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <div className="container">
          <h1>Reportes</h1>
          <button className="btn btn-primary"> reporte de caja</button>
        </div>
      </div>
    </>
  )
}

export default Reportes