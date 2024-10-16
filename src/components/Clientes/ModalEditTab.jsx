import React, { useState } from 'react'
import {
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Formik, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { BiEditAlt, BiHide, BiShow } from "react-icons/bi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import TabsForms from './Tabs/TabsForms';

function ModalEditTab(props) {

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  return (
    <>
      <BiEditAlt size={22} onClick={toggleModal} />
      <Modal isOpen={modal} fade={false} toggle={toggleModal} centered={true} size='lg'>
        <ModalHeader toggle={toggleModal}>
          <RiAccountPinCircleFill size={30}/> {props.title}
        </ModalHeader>
        <ModalBody>
          {/* Componente tabs */}
          <TabsForms idCliente={props.idCliente} actualizarListaCliente={props.actualizarListaCliente}/>

        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Guardar
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ModalEditTab