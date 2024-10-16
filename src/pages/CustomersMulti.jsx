import React, { useEffect } from 'react'
import CustomizedSteppers from '../components/Clientes/CustomizedStepper'
import { useStore } from '../providers/GlobalProvider'

function CustomersMulti(props) {
  const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
		/* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		// Para establecer en el módulo en el que nos encontramos
		props.setTitle("Requisitos del cliente");
	}, []);
  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <container>
          <div className="row">
            <div className="col">
              <CustomizedSteppers />
            </div>
          </div>
        </container>
      </div>
    </>
  )
}

export default CustomersMulti