import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { BiEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import ModalEditUser from "../usuarios/ModalEditUser";
import SwalDelete from "../usuarios/SwalDeleteUser";
import ModalInfoUser from '../usuarios/ModalInfoUser';
import TabsForms from '../Clientes/TabsForms';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 

function TableClient(props) {
  const [modal, setModal] = useState(false);
  const { actualizarListaUsuario } = props
  const toggle = () => setModal(!modal);
  const showModal = () => setModal(!modal);

  return (
    <>
      <div className="container">
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
            <Table hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Usuario</th>
                  <th>Tipo Usuario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>C4</td>
                  <td>C4222</td>
                  <td>Testeo</td>
                  <td>
                  <Button color="danger" onClick={toggle}>
                    Click Me
                  </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>C4</td>
                  <td>C4222</td>
                  <td>Testeo</td>
                  <td>
                  <Button color="danger" onClick={toggle}>
                    Click Me
                  </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>C4</td>
                  <td>C4222</td>
                  <td>Testeo</td>
                  <td>
                  <Button color="danger" onClick={toggle}>
                    Click Me
                  </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>C4</td>
                  <td>C4222</td>
                  <td>Testeo</td>
                  <td>
                  <Button color="danger" onClick={toggle}>
                    Click Me
                  </Button>
                  </td>
                </tr>
                {props.data?.length == 0 ? 
                  <tr>
                    <td colSpan="5" className="text-center">No hay usuarios registrados</td>
                  </tr>
                : props.data?.map((data, index) => (
                  <tr key={index}>
                    
                    <th scope="row">{index + 1}</th>
                    <td>{data.nombre}</td>
                    <td>{data.usuario1}</td>
                    <td>{data.tipoUsuario}</td>
                    <td>
                      <ModalEditUser
                        idUsuario={data.idUsuario}
                        actualizarListaUsuario={actualizarListaUsuario}
                      />
                      <SwalDelete 
                        idUsuario={data.idUsuario} 
                        actualizarListaUsuario={actualizarListaUsuario} 
                      />
                      <ModalInfoUser>
                        idUsuario={data.idUsuario}

                      </ModalInfoUser>
                   
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableClient;
