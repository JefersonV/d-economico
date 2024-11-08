import React from 'react'
import CustomizedStepper from './CustomizedStepper'

function MultiStepClient() {
  // actualizar relaciones cliente
  const [clienteState, setClienteState] = useState({
    idClienteRelacion: 0,
    idFiadorRelacion: 0,
    idRequisitosDocsRelacion: 0,
    idReferenciasFamRelacion: [],
    idReferenciasPersRelacion: [],
  });

  const actualizarRelacionesCliente = (nuevoCliente) => {
    setClienteState((prevState) => ({
      ...prevState,
      idClienteRelacion: nuevoCliente.idcliente,
      // otros campos si es necesario
    }));
  };
  const actualizarRelacionesClienteAsync = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Cliente/Relacion/${idPago}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          /* 
          {
            "IdCliente": 35,
            "FiadorIdfiador": 4,
            "RequisitosDocsIdrequisitosDocs": 2
          //   "ReferenciasFamIdreferenciasFam": [1, 2],
          //   "ReferenciasPersIdreferenciasPers": [1]
          } */
          totalCuota: totalCuota,
          estadoCuota: true,
          descuentoCuota: descuento || 0,
          moraCuota: moraCalculada || 0,
        }),
      });
      if (response.ok) {
        console.log('Pago registrado correctamente');
        Swal.fire ({
          position: 'center',
          icon: 'success',
          title: 'Pago registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        setOpen(false);
        dataCuotasApi();
      } else {
        console.error('Error al registrar el pago');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <CustomizedStepper relacionCliente={clienteState} actualizarRelacionesCliente={actualizarRelacionesCliente}/>
    </>
  )
}

export default MultiStepClient