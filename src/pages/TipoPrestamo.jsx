import React, { useState, useEffect } from 'react'
import { useStore } from '../providers/GlobalProvider'
import TableTipoPrestamo from '../components/Prestamos/TiposPrestamo/TableTipoPrestamo';
function TipoPrestamo(props) {
  const isOpen = useStore((state) => state.sidebar);
  useEffect(() => {
    // Para establecer en el módulo en el que nos encontramos
    props.setTitle("Conf > Tipos de Préstamos");
  }, []);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [dataTipo, setDataTipo] = useState([])
  const getDataTipoPrestamo = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/tipo`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }  
      })
      if(response.ok) {
        
        const json = await response.json()
        setDataTipo(json)
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getDataTipoPrestamo()
  }, [])
  return (
    <div className={ isOpen ? "wrapper" : "side" }>
      <div className="container">
        <div className="row">
          <div className="col">
            <TableTipoPrestamo data={dataTipo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TipoPrestamo