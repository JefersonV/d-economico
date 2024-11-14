import React from 'react'
import Searchbar from '../Searchbar'
import ModalAddReferencia1 from './ModalAddReferencia1'
// import Badge from './Badge'
import { Badge } from 'reactstrap';
import ModalDocs from './ModalDocs'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function CustomerStep3({clienteStep1, fiadorStep2, setDocsStep3}) {
  const notification = (mensaje) =>
    toast.error(mensaje, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    console.info(clienteStep1)
    console.info(fiadorStep2)
  return (
    <>
      <div className="container-fluid justify-content-center m-auto">
        <div className="row d-flex justify-content-center">
          <div className="col">
            <h5 className="blue-txt m-0">
              Adjuntar requisitos de documentación
            </h5>
          </div>
          <div className="col">
            {/* <ModalAddReferencia1 />  */}
            <ModalDocs clienteStep1={clienteStep1} setDocsStep3={setDocsStep3}/>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-12 d-flex  justify-content-center">
            {/* Falta en onchange de los props*/}
            {/* <h5 className="blue-txt">Referencia Familiar</h5>
            <Searchbar placeholder="nombre de la persona de referencia.."/>
            <h5 className="blue-txt">Referencia Personal</h5>
            <Searchbar placeholder="nombre de la persona de referencia.."/> */}

<Card sx={{ minWidth: 375 }}>
              <CardContent>
                <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                  Información del Cliente
                </Typography>
                <Typography variant="h5" component="div">
                  Nombre: {clienteStep1?.nombre || "N/A"} {clienteStep1?.apellido || "N/A"}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  Profesión: {clienteStep1?.profesion || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Dirección: {clienteStep1?.direccion || "N/A"}
                  <br />
                  Teléfono: {clienteStep1?.telefono || "N/A"}
                  <br />
                  Teléfono 2: {clienteStep1?.telefono2 || "N/A"}
                  <br />
                  Ingresos: ${clienteStep1?.ingresos?.toLocaleString() || "N/A"}
                  <br />
                  Egresos: ${clienteStep1?.egresos?.toLocaleString() || "N/A"}
                  <br />
                  DPI: {clienteStep1?.dpi || "N/A"}
                  <br />
                  Notas de Visita: {clienteStep1?.notasVisita || "N/A"}
                  <br />
                  Fiador asociado: {clienteStep1?.fiadorIdfiador ? <Badge
    color="info"
    href="#"
  >
    Listo
  </Badge> : "N/A" || fiadorStep2.length > 0 ? <Badge color="info" href="#">Listo</Badge> : "N/A"}
                    
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Detalles</Button>
              </CardActions>
            </Card>
            {/* <Badge clienteStep1={clienteStep1}/> */}
          </div>
          <div className="col-12 col-md-6 ">
            {/* <BadgeCliente fiadorStep2={fiadorStep2}/> */}
          </div>
          {/* Badge */}
          {/* <Badge /> */}
        </div>

        <div className="row">
          <div className="col-6">{/* Falta en onchange de los props*/}</div>
          {/* <div className="col-6">
            <ModalAddReferencia1 />
          </div> */}
          {/* Badge */}
          {/* <Badge /> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default CustomerStep3