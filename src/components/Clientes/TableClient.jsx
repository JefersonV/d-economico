import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Spinner } from "reactstrap";
import { BiEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import ModalEditUser from "../usuarios/ModalEditUser";
import SwalDelete from "../usuarios/SwalDeleteUser";
import ModalInfoUser from '../usuarios/ModalInfoUser';
import TabsForms from './Tabs/TabsForms';
import ModalEditTab from "./ModalEditTab";
import { TbError404 } from "react-icons/tb";

import SwalCliente from "./SwalCliente";
import Swal from "sweetalert2";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 
import { FaTrash } from "react-icons/fa";

function TableClient(props) {
  const [modal, setModal] = useState(false);
  const { actualizarListaUsuario } = props
  const toggle = () => setModal(!modal);
  const showModal = () => setModal(!modal);
  // console.info(props.busqueda)
  
  // data que se renderiza, basado en si es la busqueda o la data original
  const [dataToRender, setDataToRender] = useState([]);
  
  useEffect(() => {
    // Si hay búsqueda activa y tiene resultados
    if (props.busquedaTyping && props.busqueda.length > 0) {
      setDataToRender(props.busqueda);
    // Si se hizo una búsqueda pero no arrojó resultados
    } else if (props.busquedaTyping && props.busqueda.length === 0) {
      setDataToRender([]);
    // Si no hay búsqueda activa (busqueda es null o undefined), mostrar la data original
    } else if (!props.busquedaTyping && props.dataApi?.data?.length > 0) {
      setDataToRender(props.dataApi.data);
    } else {
      // Caso final: ni búsqueda ni data original
      setDataToRender([]);
    }
  
    console.info(dataToRender)
    // Para depurar la longitud actual de los datos a renderizar
    // console.info("Data a renderizar cliente:", dataToRender?.length);
  }, [props.busqueda, props.dataApi]);

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
                  {/* <th>Ref Familiares</th> */}
                  {/* <th>Ref Personales</th> */}
                  <th>Documentación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {dataToRender.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    {props.busquedaTyping && props.busqueda.length === 0
                      ? "No se encontró el cliente" 
                      : "No se encontraron clientes con los criterios especificados en la búsqueda"} <TbError404 size={25} color="red"/>
                  </td>
                </tr>
              )
               : (
                  dataToRender.map((data, index) => (
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td>{data?.nombre} {data?.apellido}</td>
                      <td>{data?.profesion}</td>
                      <td>{data?.telefono}</td>
                      <td>
                        {data?.fiadorIdfiador === null ? (
                          <Badge color="danger" pill>Pendiente</Badge>
                        ) : (
                          <Badge color="success" pill>Listo</Badge>
                        )}
                      </td>
                      {/* <td>
                        {data?.clienteReferenciasfams.length === 0 ? (
                          <Badge color="danger" pill>Pendiente</Badge>
                        ) : (
                          <Badge color="success" pill>Listo</Badge>
                        )}
                      </td> */}
                      {/* <td>
                        {data?.clienteReferenciaspers.length === 0 ? (
                          <Badge color="danger" pill>Pendiente</Badge>
                        ) : (
                          <Badge color="success" pill>Listo</Badge>
                        )}
                      </td> */}
                      
                      <td>
                        {data?.requisitosDocsIdrequisitosDocs === null ? (
                          <Badge color="danger" pill>Pendiente</Badge>
                        ) : (
                          <Badge color="success" pill>Listo</Badge>
                        )}
                      </td>
                      <td>
                        <ModalEditTab
                          title="Editar información del cliente"
                          idCliente={data?.idcliente}
                          actualizarListaCliente={props.actualizarListaCliente}
                        />
                        <SwalCliente 
                          idCliente={data?.idcliente} 
                          actualizarListaCliente={props.actualizarListaCliente} 
                      />
                        <BsFillTrashFill color="red" size={20}  />
                      </td>
                     
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableClient;
