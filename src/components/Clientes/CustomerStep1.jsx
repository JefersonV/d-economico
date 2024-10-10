import React, { useState, useEffect } from 'react'
import Searchbar from '../Searchbar'
import { Button } from "reactstrap";	
import ModalAddClient from './ModalAddClient';
import Badge from "./Badge"
// import "../../styles/Badge.scss";

function CustomerStep1() {

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
          <div className="col-12 col-md-6">
            {/* Falta en onchange de los props*/}
            <Searchbar placeholder="nombre del cliente.."/>
          </div>
          <div className="col-12 col-md-6">
            <ModalAddClient />
          </div>
          {/* Badge */}
          <Badge />
        </div>
      </div>
    </>
  )
}

export default CustomerStep1