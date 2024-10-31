import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Spinner } from "reactstrap";
import { BiEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { FcPrint } from "react-icons/fc";
import TabsForms from '../Clientes/Tabs/TabsForms';
// import ModalEditTab from "./ModalEditTab";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 
/* PDF */
import Document from "../Document";
import { compile } from "@fileforge/react-print";
function TablePrestamos(props) {
  const {dataPrestamosApi} = props;
  const [modal, setModal] = useState(false);
  const { actualizarListaUsuario } = props
  const toggle = () => setModal(!modal);
  const showModal = () => setModal(!modal);

  console.info(dataPrestamosApi[0]?.prestamos[0]?.idPrestamo);

  console.info(dataPrestamosApi);

  const [tipoPrestamo, setTipoPrestamo] = useState("");

  const imprimir = () => {
    // const pdf = compile(<test />);
    const html = compile(<Document />);
    console.log(html);
    // pdf.download("test.pdf");
  }
  
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
                </Button>{" "}
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
                {dataPrestamosApi.flatMap((cliente) =>
                  cliente.prestamos.map((prestamo) => (
                    <tr key={prestamo.idPrestamo}>
                      {" "}
                      {/* Cambié a prestamo.idPrestamo para una clave única */}
                      <td>{cliente.idCliente}</td>
                      <td>
                        {cliente.nombre} {cliente.apellido}
                      </td>
                      <td>
                        {new Date(
                          prestamo.fechaAprobacion
                        ).toLocaleDateString()}
                      </td>{" "}
                      {/* Cambié a prestamo.fechaAprobacion */}
                      <td> {prestamo.monto && "Q." + prestamo.monto.toFixed(2)}</td>
                      <td>{prestamo.capitalRecuperado || 0}</td>{" "}
                      {/* Añadido para mostrar monto pendiente */}
                      <td>{prestamo.cantidadCuotas}</td>
                      <td>{prestamo.tasaInteres}</td>
                      <td>
                        {prestamo.idTipoPrestamo === 1
                          ? "Mensual"
                          : prestamo.idTipoPrestamo === 2
                          ? "Quincenal"
                          : prestamo.idTipoPrestamo === 3
                          ? "Semanal"
                          : prestamo.idTipoPrestamo === 4
                          ? "Diario"
                          : "No definido"}
                      </td>
                      <td>{prestamo.estado ? 
                        <Badge
                          className="text-dark"
                          color="light"
                          pill
                        >
                          Vigente
                        </Badge> : <Badge
                          color="danger"
                          pill
                        >
                          Vencido
                        </Badge>}</td>
                      <td>
                        {/* Aquí puedes agregar acciones, como botones para editar o eliminar */}
                        
                        <button type="button" onClick={imprimir}><BsFillTrashFill size={25} color="#cf0000"/></button>
                        <Document />
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

export default TablePrestamos;
