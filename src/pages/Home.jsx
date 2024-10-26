import React, { useEffect } from 'react';
import { useStore } from '../providers/GlobalProvider';

export default function Home(props) {
	const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
		props.setTitle("Inicio");
	}, []);

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
									<p className="card-text">Administración de información detallada de los clientes, incluyendo datos personales y estado de cuentas.</p>
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
									<p className="card-text">Control de solicitudes de préstamos, seguimiento de pagos y condiciones.</p>
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
									<p className="card-text">Control de pagos realizados, gestión de recordatorios de cobro y generación de reportes de cobranza.</p>
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
									<p className="card-text">Seguimiento de transacciones de efectivo, ingresos y egresos, y gestión del flujo de caja.</p>
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
									<p className="card-text">Gestión de perfiles de usuario, asignación de roles y seguimiento de actividades.</p>
								</div>
							</div>
						</div>

						<div className="col-5">
							<div className="card text-center">
								<div className="card-header">
									Reportes
								</div>
								<div className="card-body">
									<h5 className="card-title">Generación de Reportes</h5>
									<p className="card-text">Reportes analíticos sobre el desempeño financiero y otros indicadores clave.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}