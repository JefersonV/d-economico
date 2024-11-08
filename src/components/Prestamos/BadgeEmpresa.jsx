import React, { useState, useEffect } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import "../../styles/Badge.scss";
import { BsCalendarDate } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { BsPhone } from "react-icons/bs";

/* Componente Badge */
function Badge(props) {

  // console.info(props.dataEmpresa.nombreEmpresa)

  const formatDate = (fecha) => {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} hora: ${hours}:${minutes}`;
  };


  // console.info(nombre){
//     "id": 1,
//     "nombreEmpresa": "Desarrollo Económico",
//     "direccion": "7ma avenida 06-058 Barrio El Calvario, Sololá",
//     "telefono1": "123456789",
//     "telefono2": "987654321"
// }
  // Define tu formulario aquí
  return (
    <>
      <div id="badges" className='badges'>
        <div className="col-12 col-md-4 badges-left">
          <FaCircleUser color='#002c65' size={152}/>
          <h6 className='d-block mt-4 username'>
            {props.dataEmpresa.nombreEmpresa} 
          </h6>
        </div>
        <div className="col-12 col-md-8 badges-right">
          <h4 className='text-center'>Información de la empresa</h4>
          <p className="badge-text"><FaAddressBook size={27} />{" "}Dirección: {props.dataEmpresa.direccion} </p>
          <p className="badge-text"><BsCalendarDate size={27}/>{" "}Telefono Principal: {props.dataEmpresa.telefono1} </p>
          <p className="badge-text"><BsPhone size={27} />{" "}Teléfono secundario: {props.dataEmpresa.telefono2}</p>
        </div>
      </div>
    </>
  );
}

export default Badge