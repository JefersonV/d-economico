import React, { useEffect } from 'react'
import { useStore } from '../providers/GlobalProvider'

function Customers(props) {
  const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
		/* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		// Para establecer en el módulo en el que nos encontramos
		props.setTitle("Préstamos");
	}, []);
  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <h1>Préstamos ...</h1>

      </div>
    </>
  )
}

export default Customers