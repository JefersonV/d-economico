import React, { useState, useEffect } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import "../../styles/Badge.scss";
import { BsCalendarDate } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { BsPhone } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
/* Componente Badge */
function Badge(props) {

  const { nombre, fecha, direccion, telefono, ingreso, egreso, referencias } = props;

  const formatDate = (fecha) => {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} hora: ${hours}:${minutes}`;
  };
  // console.info(nombre)
  // Define tu formulario aquí
  return (
    <>
      <div className="badges">
        <div className="col-12 col-md-4 badges-left">
          <FaCircleUser color='#002c65' size={152}/>
          <h6 className='d-block mt-4 username'>
            {nombre}
          </h6>
        </div>
        <div className="col-12 col-md-8 badges-right">
          <p className="badge-text"><BsCalendarDate size={27}/>{" "}Fecha registro: {!fecha ? "" : formatDate(fecha)}</p>
          <p className="badge-text"><FaAddressBook size={27} />{" "}Dirección: {direccion} </p>
          <p className="badge-text"><BsPhone size={27} />{" "}Teléfono: {telefono}</p>
          <p className="badge-text"><FaMoneyBill size={27} />{" "}Ingreso mensual:  Q.{ingreso?.toFixed(2)} </p>
          <p className="badge-text"><FaMoneyBill size={27} />{" "}Egreso: {egreso} </p>
          <p className="badge-text"><FaCommentDots size={27} />{" "}Referencias de la visita: {referencias} </p>
        </div>
      </div>
    </>
  );
}

export default Badge