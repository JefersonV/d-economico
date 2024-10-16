import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import "../../styles/Badge.scss";
import { BsCalendarDate } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { BsPhone } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
/* Componente Badge */
function Badge() {
  // Define tu formulario aquí
  return (
    <>
      <div className="badges">
        <div className="col-12 col-md-4 badges-left">
          <FaCircleUser color='#002c65' size={152}/>
          <span className='d-block mt-4 username'>
            John Doe
          </span>
        </div>
        <div className="col-12 col-md-8 badges-right">
          <p className="badge-text"><BsCalendarDate size={25}/>Fecha registro: </p>
          <p className="badge-text"><FaAddressBook size={25} /> Dirección: </p>
          <p className="badge-text"><BsPhone size={25} /> Teléfono: </p>
          <p className="badge-text"><FaMoneyBill size={25} /> Ingreso mensual: </p>
          <p className="badge-text"><FaMoneyBill size={25} /> Egreso: </p>
          <p className="badge-text"><FaCommentDots size={25} /> Referencias de la visita: </p>
        </div>
      </div>
    </>
  );
}

export default Badge