import React, { useState, useEffect } from 'react';
import { useStore } from '../providers/GlobalProvider';

export default function Home(props) {
	const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
		props.setTitle("Inicio");
	}, []);

	const [dataUsuario, setDataUsuario] = useState({});
	// id del usuario que se acaba de loguear
	const userId = localStorage.getItem("userId");
	// console.info(userId);

	const VITE_BACKEND_URL = import.meta.env;
	const getDataUsuario = async (userId) => {
		try {
			const response = await fetch(`${VITE_BACKEND_URL}/Account/${userId}`);
			const data = await response.json();
			setDataUsuario(data);
		} catch(error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if(userId) {
			getDataUsuario(userId);
		}
	}, [userId]);

	return (
		<>
			<div className={isOpen ? "wrapper" : "side"}>
				<div className="container">
					<div className="row justify-content-center flex-wrap">
						<div className="col-5">
							<div className="card text-center">
								<div className="card-header">
									Clientes
								</div>
								<div className="card-body">
									<h5 className="card-title">Gestión de Clientes</h5>
									<p className="card-text">Administración de información detallada de los clientes, incluyendo datos personales y requisitos para poder aplicar a un préstamo.</p>
								</div>
							</div>
						</div>

						<div className="col-5">
							<div className="card text-center">
								<div className="card-header">
									Préstamos
								</div>
								<div className="card-body">
									<h5 className="card-title">Administración de Préstamos</h5>
									<p className="card-text">Control de solicitudes de préstamos, creación automatizada de cuotas base</p>
								</div>
							</div>
						</div>
					</div>
					
					{/* Row 2 */}
					<div className="row justify-content-center mt-4">
						<div className="col-5">
							<div className="card text-center">
								<div className="card-header">
									Pagos / Cobranza
								</div>
								<div className="card-body">
									<h5 className="card-title">Gestión de Pagos</h5>
									<p className="card-text">Control de pagos realizados, gestión automatizada de fechas y pagos parciales.</p>
								</div>
							</div>
						</div>

						<div className="col-5">
							<div className="card text-center">
								<div className="card-header">
									Capital (Caja)
								</div>
								<div className="card-body">
									<h5 className="card-title">Monitoreo de Capital</h5>
									<p className="card-text">Seguimiento de transacciones de efectivo, ingresos y egresos, y gestión de caja.</p>
								</div>
							</div>
						</div>
					</div>

					{/* Row 3 */}
					<div className="row justify-content-center mt-4">
						<div className="col-5">
							<div className="card text-center">
								<div className="card-header">
									Usuarios
								</div>
								<div className="card-body">
									<h5 className="card-title">Administración de Usuarios</h5>
									<p className="card-text">Gestión de perfiles de usuario, para determinar los módulos de acceso</p>
								</div>
							</div>
						</div>

						{/* <div className="col-5">
							<div className="card text-center">
								<div className="card-header">
									Reportes
								</div>
								<div className="card-body">
									<h5 className="card-title">Generación de Reportes</h5>
									<p className="card-text">Reportes de los movimientos financieros del día, semana o mes.</p>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
}