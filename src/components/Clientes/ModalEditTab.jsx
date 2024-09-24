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
import { TbTruck } from "react-icons/tb";
import TabsForms from './TabsForms';

function ModalEditTab(props) {

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  return (
    <>
      <BiEditAlt size={22} onClick={toggleModal} />
      <Modal isOpen={modal} fade={false} toggle={toggleModal} centered={true} size='lg'>
        <ModalHeader toggle={toggleModal}>
          <TbTruck size={30} /> {props.title}
        </ModalHeader>
        <ModalBody>
          <TabsForms />

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