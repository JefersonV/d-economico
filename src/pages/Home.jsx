import React, { useEffect } from 'react'
import { useStore } from '../providers/GlobalProvider'



export default function Home(props) {
	const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
		/* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		// Para establecer en el módulo en el que nos encontramos
		props.setTitle("Inicio");
	}, []);

  return (
    <>
			<div className={isOpen ? "wrapper" : "side"} >
				<div className="container-fluid mt-4">
					<div className="row">
						<div className="card">
							<div className="card-body">
								<h3 className="color-red">Bienvenido</h3>
								<p>sesion iniciada...</p>
							</div>
						</div>
					</div>
				</div>
				
			</div>	
    </>
  )
}
