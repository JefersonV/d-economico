import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomerStep1 from './CustomerStep1';
import CustomerStep2 from './CustomerStep2';
import CustomerStep3 from './CustomerStep3';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CustomizedStepper() {
  // Notificaciones
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

  // Datos para enviar a la solicitud post
  const [clienteStep1, setClienteStep1] = useState(null);
  const [fiadorStep2, setFiadorStep2] = useState(null);
  const [docsStep3, setDocsStep3] = useState(null);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  
  const steps = [
    { label: 'Registra al cliente, o búscalo si es uno existente', content: <CustomerStep1 clienteStep1={clienteStep1} setClienteStep1={setClienteStep1} /> },
    { label: 'Registra al fiador o búscalo si es uno existente', content: <CustomerStep2 clienteStep1={clienteStep1} setFiadorStep2={setFiadorStep2} fiadorStep2={fiadorStep2}/> },
    { label: 'Documentación', content: <CustomerStep3 clienteStep1={clienteStep1} fiadorStep2={fiadorStep2} setDocsStep3={setDocsStep3}/> },
  ];

  useEffect(() => {
    console.log(clienteStep1);
    console.log(fiadorStep2);
  }, [clienteStep1, fiadorStep2]);

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {

  if (activeStep === 1 && clienteStep1 && clienteStep1.fiadorIdfiador !== null) {
    notification("Este cliente ya tiene un fiador asociado. Puedes continuar al paso 3.");
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // Saltar al paso 3
    return;
  }

  // Tercera condición: si se seleccionó el cliente, no tiene un fiador asociado, pero se seleccionó un fiador en el paso 2
  if (activeStep === 1 && clienteStep1 && !clienteStep1.fiadorIdfiador && fiadorStep2) {
    notification("Puedes continuar al paso 3.");
  } else if (activeStep === 1) {
    notification("Debes seleccionar un fiador y cliente antes de continuar.");
    return; // Detener el avance si la validación falla
  }

  if(activeStep === 2 && fiadorStep2 === null && clienteStep1.fiadorIdfiador === null) {
    notification("Debes seleccionar un fiador antes de continuar.");
    return;
  } 

    // comprueba si tiene fiador y es un numero
    
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("No puedes omitir un paso que no es opcional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  console.info(clienteStep1?.fiadorIdfiador);

  useEffect(() => {
    console.info(docsStep3);
  }, [docsStep3]);

  const [fiadorFinal, setFiadorFinal] = useState(null);

    // Actualizar fiadorFinal cuando cambian clienteStep1 o fiadorStep2
    useEffect(() => {
      if (clienteStep1?.fiadorIdfiador) {

        // cuando ya tiene asociado el fiador por defecto
        setFiadorFinal(clienteStep1?.fiadorIdfiador);
      } else {
        // cuando se selecciona un fiador en el paso 2
        setFiadorFinal(fiadorStep2?.idfiador || null);
      }
    }, [clienteStep1, fiadorStep2]);

  const handleFinish = async () => {
    const bodyCliente = {
      IdCliente: clienteStep1.idcliente,
      FiadorIdfiador: fiadorFinal || null,
      RequisitosDocsIdrequisitosDocs: docsStep3 || null,
    };
  
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Cliente/Relacion/${clienteStep1.idcliente}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyCliente)
      });

      if (response.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          navigate('/clientes');
        }, 500)
        // Redirigir a la ruta /clientes
      } else {
        console.log('Ha ocurrido un error al enviar el formulario');
      }
    } catch (error) {
      console.log('Ha ocurrido un error al enviar el formulario');
      console.log(error);
    }
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={step.label} {...stepProps}>
                <StepLabel {...labelProps}>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box sx={{ mt: 3 }}>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reiniciar</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {steps[activeStep].content}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Atrás
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {/* {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Omitir
                  </Button>
                )} */}
                <Button onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}>
                  {activeStep === steps.length - 1 ? 'Finalizado' : 'Siguiente'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}