import React, { useState, useEffect } from 'react'
import Searchbar from '../Searchbar'
import { Button } from "reactstrap";	
import ModalAddClient from './ModalAddClient';

function CustomerStep1() {

  /* Componente Badge */
  function Badge() {
    // Define tu formulario aquí
    return (
      <>
        <div className="row">
          <div className="col-4">
            <figure>
              <img src="Imagen de ayuda" alt="imagen del badge estática" />
            </figure>
          </div>
          <div className="col-8">
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

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [dataApi, setDataApi] = useState([])

  const getData = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Cliente`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Aquí puedes agregar el cuerpo de la solicitud si se requiere enviar datos
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      const data = await response.json(); // Agrega await aquí
      setDataApi(data);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }  
  }

 /*  useEffect(() => {
    getData();
  }, []); */
  

  return (
    <>
      <div className="container-fluid justify-content-center m-auto">
        <div className="row">
          <div className="col-6">
            {/* Falta en onchange de los props*/}
            <Searchbar placeholder="nombre del cliente.."/>
          </div>
          <div className="col-6">
            <ModalAddClient />
          </div>
          {/* Badge */}
          <Badge />
        </div>
      </div>
      <h1>Customer Step 1</h1>
    </>
  )
}

export default CustomerStep1