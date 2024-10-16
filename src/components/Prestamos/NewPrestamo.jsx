import React, { useState, useEffect } from 'react'
import { useStore } from '../../providers/GlobalProvider'
import FormNewPrestamo from './FormNewPrestamo';

function NewPrestamo(props) {
  const isOpen = useStore((state) => state.sidebar);
  useEffect(() => {
		/* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		// Para establecer en el módulo en el que nos encontramos
		props.setTitle("Nuevo Préstamo");
	}, []);
  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <div className="container">
          <p>Nuevo</p>
          <FormNewPrestamo />
        </div>
      </div>
    </>
  )
}

export default NewPrestamo