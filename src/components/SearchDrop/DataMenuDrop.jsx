import React, { useState, useEffect } from 'react'
import "../../styles/MenuDrop.scss"

function DataMenuDrop(props) {
  const { nameCliente, apellido, index, id, itemSelected, setItemSelectedList, telefono } = props
  // const [itemSelected, setItemSelected] = useState(null)
  // Función para formatear la fecha en formato día/mes/año hora:[hora]
  const formatDate = (fecha) => {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} hora: ${hours}:${minutes}`;
  };
  useEffect(() => {
    // id del item seleccionado
    // console.log(itemSelected)
  }, [itemSelected])

  const handleClick = (e) => {
    e.preventDefault()
    // Captura el item seleccionado, además ahora está disponible en el componente padre (IndividualSale)
    setItemSelectedList(id) // id -> .map () item.id
  }
  return (
    <>
      <button className="DataContainer" onClick={handleClick} title={formatDate(props.fechaRegistro)}>
        {index + 1}  {nameCliente} {apellido} <span className="precio">{"  "} Tel: {telefono}</span> 
      </button>
    </>
  )
}

export default DataMenuDrop