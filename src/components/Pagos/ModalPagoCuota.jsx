import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Badge, Table } from 'reactstrap';
import Swal from 'sweetalert2';

export default function ModalPagoCuota({ idPago, dataCuotasApi }) {
  const [open, setOpen] = useState(false);
  const [dataPago, setDataPago] = useState(null);
  const [mora, setMora] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [moraCalculada, setMoraCalculada] = useState(0);
  const [loading, setLoading] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDataPago(null);
    // Resetear los valores de mora y descuento
    setMora(0);
    setDescuento(0);
    setMoraCalculada(0);

    setWarningMessage('');
  };

  // para enviara a put a la base de datos
  const [totalCuota, setTotalCuota] = useState(0);
    
  const getDataPago = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/cuota/${idPago}`);
      if (response.ok) {
        const data = await response.json();
        setDataPago(data);
      } else {
        console.error('Error al obtener datos');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const registraPago = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/pago/${idPago}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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

  useEffect(() => {
    if (open) {
      getDataPago();
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Mora:", mora, "Descuento:", descuento);

    registraPago();
    // Aquí podrías agregar más lógica para manejar el pago
  };

  const convertirFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  // Este efecto se encargará de calcular la mora y manejar los mensajes de advertencia
  useEffect(() => {
    if (dataPago) {
      // Cálculo de la mora basada en los días de atraso
      let moraCalculada = dataPago.diasAtraso > 0 ? mora * dataPago.diasAtraso : 0;
      // Asegurarse de que la mora no sea negativa
      moraCalculada = Math.max(moraCalculada, 0);

      // Cálculo del descuento válido
      const descuentoValido = Math.max(0, Number(descuento) || 0);

      // Verificar si el descuento es mayor que la mora calculada después de ajustar
      if (descuentoValido > moraCalculada) {
        setWarningMessage('El descuento no puede ser mayor que la mora calculada.');
      } else {
        moraCalculada -= descuentoValido; // Restar el descuento de la mora
        setWarningMessage('');
      }

      // Actualizar el estado de la mora calculada
      setMoraCalculada(moraCalculada);

      setTotalCuota((dataPago.montoCuota + dataPago.interesCuota + moraCalculada) - descuento)

      console.info('Mora calculada:', moraCalculada);
      console.info('Descuento:', descuentoValido);
      console.info('Total a pagar:', totalCuota);
    }
  }, [mora, descuento, dataPago]); // Asegurarse de que se verifiquen todos los cambios relevantes

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Detalles del Pago</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="border mb-2">
                Estado del pago de cuota
                {dataPago && dataPago.estadoCuota && dataPago.diasAtraso > 0 ? (
                  <Badge color="danger">Atrasado</Badge>
                ) : (
                  <Badge color="info">Vigente</Badge>
                )}
                <p className="mt-2">Días de pago atrasados: {dataPago?.diasAtraso || "0"}</p>
                <p>Fecha de vencimiento: {dataPago?.fechaVencimientoCuota ? convertirFecha(dataPago.fechaVencimientoCuota) : "N/A"}</p>
              </div>
              <div className="row border mb-4">
                <label>La mora y el descuento solo aplican si ha vencido la cuota.</label>
                <div className="col col-md-4 form-group mb-4">
                  <label htmlFor="mora">Mora</label>
                  <input
                    disabled={dataPago ? !dataPago.estadoCuota : true}
                    type="number"
                    name="mora"
                    id="mora"
                    className="form-control"
                    placeholder="Mora"
                    value={mora}
                    onChange={(e) => setMora(Number(e.target.value))}
                  />
                </div>
                <div className="col col-md-4">
                  <label htmlFor="descuento">Descuento</label>
                  <input
                    disabled={dataPago ? !dataPago.estadoCuota : true}
                    type="number"
                    name="descuento"
                    id="descuento"
                    className="form-control"
                    placeholder="Descuento"
                    value={descuento}
                    onChange={(e) => setDescuento(Number(e.target.value))}
                  />
                </div>
              </div>
              {warningMessage && (
                <Typography color="error" variant="body2">
                  {warningMessage}
                </Typography>
              )}
              <div className="row">
                <div className="col col-md-4 border">
                  <h6>Cliente</h6>
                  <p>
                    Nombre:{" "}
                    <strong>
                      {dataPago ? `${dataPago.clienteNombre || ""} ${dataPago.clienteApellido || ""}` : 'Cargando...'}
                    </strong>
                  </p>
                  <p>Teléfono: {dataPago ? `${dataPago.clienteTelefono || ""} ` : 'Cargando'}</p>
                  <p>Teléfono2: {dataPago ? `${dataPago.clienteTelefono2 || ""} ` : 'Cargando'}</p>
                </div>
                <div className="col col-md-8 border">
                  <h6>Detalle de la cuota</h6>
                  <p><strong>Fecha a pagar:</strong> {new Date().toLocaleDateString()}</p>
                  <Table>
                    <thead>
                      <tr>
                        <th>Detalle</th>
                        <th>Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Cuota a pagar no.</td>
                        <td>{dataPago ? dataPago.numeroCuota : "0"}</td>
                      </tr>
                      <tr>
                        <td>Monto por cuota</td>
                        <td>Q. {dataPago ? dataPago.montoCuota.toFixed(2) : "0.00"}</td>
                      </tr>
                      <tr>
                        <td>Intereses</td>
                        <td>Q. {dataPago ? dataPago.interesCuota.toFixed(2) : "0.00"}</td>
                      </tr>
                      <tr>
                        <td>Descuento</td>
                        <td>Q. {descuento.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Mora</td>
                        <td>Q. {moraCalculada.toFixed(2)}</td> {/* Mostrar mora calculada */}
                      </tr>
                      <tr>
                        <td>Total a pagar</td>
                        <td>
                          Q. {totalCuota ? totalCuota : "0.00"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <DialogActions>
                    <Button 
                      type="submit" 
                      color="primary" 
                      disabled={descuento > moraCalculada} // Deshabilitar si el descuento es mayor que la mora
                    >
                      Pagar
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                      Cancelar
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}