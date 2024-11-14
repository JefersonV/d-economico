import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UploadDocs from './UploadDocs';

// Función para formatear la fecha
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Meses de 0 a 11
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

function Example({ clienteStep1, setDocsStep3 }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  console.info(clienteStep1);

  const isClientValid = () => {
    return clienteStep1 && typeof clienteStep1 === 'object' && Object.keys(clienteStep1).length > 0;
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Adjuntar documentación
      </Button>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Documentación</ModalHeader>
        <ModalBody>
          {!isClientValid() ? (
            <>
              <h5>Primero debes seleccionar el cliente en el paso 1</h5>
              <p>Búscalo y selecciónalo, click en el botón atrás</p>
            </>
          ) : (
            <>
              <label>Adjuntar documentación al cliente:</label>
              <p>Fecha de Registro: {formatDate(clienteStep1.fechaRegistro)}</p>
              <p>Cliente: {clienteStep1.nombre || 'N/A'} {clienteStep1.apellido || 'N/A'}</p>
              
              <hr />
              <UploadDocs setDocsStep3={setDocsStep3}/>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Example;