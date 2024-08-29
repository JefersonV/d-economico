import React, { useEffect } from 'react'
import { useStore } from '../providers/GlobalProvider'

function Customers(props) {
  const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
    /* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		props.setTitle("Pagos");
	}, []);
  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <h1>Cobranza ...</h1>

      </div>
    </>
  )
}

export default Customers