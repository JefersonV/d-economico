import React from 'react'

/* Componente Badge */
function Badge() {
  // Define tu formulario aquí
  return (
    <>
      <div className="row badge">
        <div className="col-4 badge-left">
          <figure>
            <img src="Imagen de ayuda" alt="imagen del badge estática" />
          </figure>
        </div>
        <div className="col-8 badge-right">
          <p>Fecha registro: </p>
          <p>Dirección: </p>
          <p>Teléfono: </p>
          <p>Ingreso mensual: </p>
          <p>Egreso: </p>
          <p>Referencias de la visita: </p>
        </div>
      </div>
    </>
  );
}

export default Badge