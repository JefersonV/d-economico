import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Badge from '../Clientes/Badge';
import TableCuota from './TableCuota';

function ModalPagoCliente({ idPrestamo, toggleModal}) {
  // El modal se abre por defecto
  const [modal, setModal] = useState(true); 
  const [dataCuotas, setDataCuotas] = useState([]);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getDataCuotas = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/cuotas/${idPrestamo}`);
      const data = await response.json();
      if (response.ok) {
        setDataCuotas(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataCuotas();
  }, [idPrestamo]);

  return (
    <Modal isOpen={modal} toggle={toggleModal} size='xl'>
      <ModalHeader toggle={toggleModal}>Cuotas cliente</ModalHeader>
      <ModalBody>
        <div className="container">
          <div className="row">
            <div className="col">
              <Badge nombre={dataCuotas?.nombre || ""} apellido={dataCuotas?.apellido || ""}/>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col col-lg-10 m-auto">
              <TableCuota data={dataCuotas} getDataCuotas={getDataCuotas} toggleModalB={toggleModal}/>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleModal}>
          Do Something
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalPagoCliente;