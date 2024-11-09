import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UploadDocs from './UploadDocs';

function Example(args) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Adjuntar documentación
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args} centered>
        <ModalHeader toggle={toggle}>Documentación</ModalHeader>
        <ModalBody>
          <UploadDocs />
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '} */}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Example;