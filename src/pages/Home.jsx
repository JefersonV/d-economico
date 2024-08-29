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
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-5 ">
							<div class="card text-center">
								<div class="card-header">
									Featured
								</div>
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
								<div class="card-footer text-body-secondary">
									2 days ago
								</div>
							</div>
						</div>

						<div className="col-5">
							<div class="card text-center">
								<div class="card-header">
									Featured
								</div>
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
								<div class="card-footer text-body-secondary">
									2 days ago
								</div>
							</div>
						</div>
						
					</div>
					{/* Row 2 */}
					<div className="row  justify-content-center mt-4">
						<div className="col-5">
							<div class="card text-center">
								<div class="card-header">
									Featured
								</div>
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
								<div class="card-footer text-body-secondary">
									2 days ago
								</div>
							</div>
						</div>

						<div className="col-5">
							<div class="card text-center">
								<div class="card-header">
									Featured
								</div>
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
								<div class="card-footer text-body-secondary">
									2 days ago
								</div>
							</div>
						</div>
						
					</div>
					{/* Row 3 */}
					<div className="row justify-content-center mt-4">
						<div className="col-5">
							<div class="card text-center">
								<div class="card-header">
									Featured
								</div>
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
								<div class="card-footer text-body-secondary">
									2 days ago
								</div>
							</div>
						</div>

						<div className="col-5">
							<div class="card text-center">
								<div class="card-header">
									Featured
								</div>
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
								<div class="card-footer text-body-secondary">
									2 days ago
								</div>
							</div>
						</div>
						
					</div>
					{/* Row 4 */}
					<div className="row justify-content-center mt-4">
						<div className="col-5">
							<div class="card text-center">
								<div class="card-header">
									Featured
								</div>
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
								<div class="card-footer text-body-secondary">
									2 days ago
								</div>
							</div>
						</div>

						<div className="col-5">
							<div class="card text-center">
								<div class="card-header">
									Featured
								</div>
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
								<div class="card-footer text-body-secondary">
									2 days ago
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>	
    </>
  )
}
