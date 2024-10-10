import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col, Input } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';
import { Formik, Form } from 'formik';
import { BiEditAlt, BiFoodMenu } from 'react-icons/bi';
import Swal from 'sweetalert2';
import '../../styles/Formulario.scss';
import TabsRef1 from './Tabs/TabRef1';

function ModalAddReferencia1() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
    <ButtonGroup className="my-2">
      <ButtonGroup>
        <UncontrolledDropdown>
          <DropdownToggle caret color="primary">
            Agregar referencias
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>
              Agregar referencia familiar
            </DropdownItem>
            <DropdownItem onClick={toggle}>
              Another Action
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem header>
              Agregar referencia personal
            </DropdownItem>
            <DropdownItem>
              Another Action
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </ButtonGroup>
    </ButtonGroup>
      <Modal isOpen={modal} fade={false} toggle={toggle} centered={true} size='lg'>
        <ModalHeader toggle={toggle}>
          <BiFoodMenu size={30} /> Ingreso de referencia Familiar
        </ModalHeader>
        <ModalBody>
          <TabsRef1 />
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalAddReferencia1;