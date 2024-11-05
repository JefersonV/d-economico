import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";

function TableEstimacion({ monto, cliente, cuotas, tipoPrestamo, tasaInteres, fechaPrimerPago, prestamosClienteApi, totalesPrestamo }) {
  // Validación de entradas
  if (
    cuotas <= 0 || 
    (monto === undefined || monto === null) || 
    (tasaInteres === undefined || tasaInteres === null) || 
    (fechaPrimerPago === undefined || fechaPrimerPago === null) || 
    (tipoPrestamo === undefined || tipoPrestamo === null)
  ) {
    return (
      <Table hover bordered responsive>
        <thead>
          <tr>
            <th>Cuota</th>
            <th>Fecha</th>
            <th>Cuota Capital</th>
            <th>Interés</th>
            <th>Total</th>
            <th>Monto Residual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="6" className="text-center">No hay estimaciones disponibles. Ingresa los datos necesarios.</td>
          </tr>
        </tbody>
      </Table>
    );
  }

  useEffect(() => {
    // setMontoCalc(monto);
  }, [monto, cuotas, tipoPrestamo, tasaInteres, fechaPrimerPago]);

  if (cuotas <= 0 || monto <= 0 || tasaInteres < 0) {
    return (
      <div>
        <p>Los valores de monto, cuotas y tasa de interés deben ser positivos.</p>
      </div>
    );
  }

  const estimaciones = [];
  // let montoResidual = monto;
  let fecha = new Date(fechaPrimerPago);
  // Calcular cuota de capital
  const cuotaCapital = monto / cuotas;
  // Calcular el interes fijo por cuota, es fijo siempre 
  const interesCuota = (cuotaCapital * tasaInteres) / 100; 
  // Calcular el total a recuperar del préstamo
  let totalARecuperar = parseFloat(cuotaCapital + interesCuota) * parseFloat(cuotas);
  // Calcular el total de la cuota monto + interesCuota
  let totalCuota = cuotaCapital + interesCuota;
  // console.info("el total es " + totalARecuperar);|
  let residualCalculado = totalARecuperar;

  for (let i = 1; i <= cuotas; i++) {
    residualCalculado -= totalCuota; // Ajustar monto residual
    
    // Asegurarse de que el monto residual no baje de cero
    residualCalculado = Math.max(residualCalculado, 0);

    estimaciones.push({
      cuota: i,
      fecha: fecha.toLocaleDateString(),
      cuotaCapital: cuotaCapital.toFixed(2),
      interesCuota: interesCuota.toFixed(2),
      total: totalCuota.toFixed(2),
      montoResidual: residualCalculado.toFixed(2),
    });

    // Incrementar la fecha según el tipo de préstamo
    switch (tipoPrestamo) {
      case "Mensual":
        fecha.setMonth(fecha.getMonth() + 1);
        break;
      case "Quincenal":
        fecha.setDate(fecha.getDate() + 14);
        break;
      case "Semanal":
        fecha.setDate(fecha.getDate() + 7);
        break;
      case "Diario":
        fecha.setDate(fecha.getDate() + 1);
        break;
      default:
        throw new Error("Tipo de préstamo no válido.");
    }
  }

  return (
    <Table hover bordered responsive>
      <thead>
        <tr>
          <th>Cuota</th>
          <th>Fecha</th>
          <th>Cuota Capital</th>
          <th>Interés</th>
          <th>Total Cuota</th>
          <th>Monto Residual</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            #
          </td>
          <td>
            ----
          </td>
          <td>
            ----
          </td>
          <td>
            ----
          </td>
          <td>
            ----
          </td>
          <td>
            <b>Monto Total:</b><br />
            Q.{totalARecuperar.toFixed(2)}
          </td>
        </tr>
        {estimaciones.length > 0 ? (
          estimaciones.map((estimacion) => (
            <tr key={estimacion.cuota}>
              <td>{estimacion.cuota}</td>
              <td>{estimacion.fecha}</td>
              <td>{estimacion.cuotaCapital}</td>
              <td>{estimacion.interesCuota}</td>
              <td>{estimacion.total}</td>
              <td>{estimacion.montoResidual}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">No hay estimaciones disponibles. Ingresa los datos necesarios.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default TableEstimacion;