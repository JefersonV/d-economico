import React, { useState, useEffect } from 'react'
import { useStore } from "../providers/GlobalProvider";
function ComprobantesDocs(props) {
  const isOpen = useStore((state) => state.sidebar);

  useEffect(() => {
    /* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
    props.setTitle("Capital");
  }, [props]); // Agregar props como dependencia para evitar warnings


  return (
    <div className={isOpen ? "wrapper" : "side"}>
      <h4>ComprobantesDocs</h4>
    </div>
  )
}

export default ComprobantesDocs