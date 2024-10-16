import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Spinner } from "reactstrap";
import { BiEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import ModalEditUser from "../usuarios/ModalEditUser";
import SwalDelete from "../usuarios/SwalDeleteUser";
import ModalInfoUser from '../usuarios/ModalInfoUser';
import TabsForms from '../Clientes/Tabs/TabsForms';
// import ModalEditTab from "./ModalEditTab";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 

function TablePrestamos(props) {
  const [modal, setModal] = useState(false);
  const { actualizarListaUsuario } = props
  const toggle = () => setModal(!modal);
  const showModal = () => setModal(!modal);

  return (
    <>
      <div className="container-fluid">
        <div className="col">
          <div className="row">
          <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={showModal}>Modal title</ModalHeader>
        <ModalBody>
          <TabsForms />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={showModal}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={showModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
            <Table hover bordered responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cliente</th>
                  <th>Fecha aprobada</th>
                  <th>Monto</th>
                  <th>Monto pendiente</th>
                  <th>Cuotas</th>
                  <th>Intereses</th>
                  <th>Tipo préstamo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TablePrestamos;
