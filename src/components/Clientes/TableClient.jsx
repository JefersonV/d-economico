import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Spinner } from "reactstrap";
import { BiEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import ModalEditUser from "../usuarios/ModalEditUser";
import SwalDelete from "../usuarios/SwalDeleteUser";
import ModalInfoUser from '../usuarios/ModalInfoUser';
import TabsForms from './Tabs/TabsForms';
import ModalEditTab from "./ModalEditTab";

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 

function TableClient(props) {
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
                  <th>Nombre</th>
                  <th>Profesion/Oficio</th>
                  <th>Teléfono</th>
                  <th>Fiador</th>
                  <th>Ref Familiares</th>
                  <th>Ref Personales</th>
                  <th>Documentación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {props.busqueda?.length === 0 || props.busqueda === null || props.busqueda === undefined ? (
                  <tr>
                    <td colSpan="5" className="text-center">No se encontró el cliente</td>
                  </tr>
                ) : props.dataApi?.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">No hay usuarios registrados</td>
                  </tr>
                ) : (
                  props.dataApi?.data?.map((data, index) => (
                  <tr key={index}>
                    
                    <td scope="row">{index + 1}</td>
                    <td>{data?.nombre}</td>
                    <td>{data?.profesion}</td>
                    <td>{data?.telefono}</td>
                    {/* Renderizado condicional */}
                    <td>
                      {data?.fiadorIdfiador === null ? 
                      <Badge
                        color="danger"
                        pill
                        text-color="white"
                      >
                        Pendiente
                      </Badge> 
                      : 
                      <Badge
                       color="success"
                       pill
                      >
                       Listo
                      </Badge>  }
                    </td>
                    <td>
                      {data?.clienteReferenciasfams.length === 0 ? 
                      <Badge
                       color="danger"
                       pill
                       text-color="white"
                      >
                       Pendiente
                      </Badge> 
                      : 
                       <Badge
                       color="success"
                       pill
                      >
                       Listo
                      </Badge> 
                      }
                    </td>  
                    <td>
                      {data?.clienteReferenciaspers.length == 0 ? 
                        <Badge
                        color="danger"
                        pill
                        text-color="white"
                        >
                        Pendiente
                        </Badge>
                      :
                        <Badge
                          color="success"
                          pill
                          >
                          Listo
                        </Badge> 
                      }
                    </td>
                    <td>
                    {data?.requisitosDocsIdrequisitosDocs === null ? 
                      <Badge
                       color="danger"
                       pill
                       text-color="white"
                      >
                       Pendiente
                      </Badge> 
                      : 
                       <Badge
                       color="success"
                       pill
                       >
                       Listo
                     </Badge> 
                    }
                    </td>  
                    <td>
                      {/* <ModalEditUser
                        idUsuario={data.idUsuario}
                        actualizarListaUsuario={actualizarListaUsuario}
                      /> */}
                      <ModalEditTab title="Editar información del cliente" 
                      idCliente={data?.idcliente} 
                      actualizarListaCliente={props.actualizarListaCliente}/>
                      {/* <SwalDelete 
                        idUsuario={data.idUsuario} 
                        actualizarListaUsuario={actualizarListaUsuario} 
                      />
                      <ModalInfoUser>
                        idUsuario={data.idUsuario}

                      </ModalInfoUser> */}
                   
                    </td>
                  </tr>
                  )
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
