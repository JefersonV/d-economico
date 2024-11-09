import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ComprobanteDePago = ({ idPago }) => {
  const [paymentData, setPaymentData] = useState(null);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/cuota/${idPago}`);
        const data = await response.json();
        if (response.ok) {
          setPaymentData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentData();
  }, []);

  const generatePDF = () => {
    if (!paymentData) return;

    const doc = new jsPDF();

    // Agregar logo
    // const imgData = 'data:image/png;base64,...'; // Reemplaza con tu logo en base64
    // doc.addImage(imgData, 'PNG', 20, 10, 30, 30);

    // Agregar título
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 255); // Azul
    doc.text('Comprobante de Pago', 60, 20);

    // Agregar información
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Negro
    doc.text(`No. ${paymentData.idPago}`, 170, 20);
    doc.text(`Fecha: ${paymentData.fechaPagoCuota.slice(0, 10)} ${paymentData.fechaPagoCuota.slice(11, 19)}`, 20, 45);
    doc.text('Concepto: Pago de Cuota de Préstamo', 20, 55);
    doc.text(`Nombre: ${paymentData.clienteNombre} ${paymentData.clienteApellido}`, 20, 65);
    doc.text(`Dirección: ${paymentData.clienteDireccion}`, 20, 75);

    // Agregar tabla
    doc.autoTable({
      head: [['Cuota No.', 'Abono', 'Intereses', 'Mora', 'Total a Pagar', 'Saldo de Capital']],
      body: [
        [
          `${paymentData.numeroCuota}`,
          `Q.${paymentData.montoCuota.toFixed(2)}`,
          `Q.${paymentData.interesCuota.toFixed(2)}`,
          `Q.${paymentData.moraCuota.toFixed(2)}`,
          `Q.${paymentData.totalCuota.toFixed(2)}`,
          `Q.${(paymentData.idPrestamo - (paymentData.numeroCuota - 1) * paymentData.montoCuota).toFixed(2)}`,
        ],
      ],
      startY: 85,
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 20 },
        4: { cellWidth: 35 },
        5: { cellWidth: 35 },
      },
    });

    // Agregar espacio para las firmas
    doc.setFontSize(10);
    doc.text('Firma del Cliente:', 20, 200);
    doc.text('Firma del Cajero:', 20, 210);
    doc.addPage();

    doc.save(`comprobante_de_pago_${paymentData.idPago}.pdf`);
  };

  return (
    <div>
      <button onClick={generatePDF}>Imprimir</button>
    </div>
  );
};

export default ComprobanteDePago;