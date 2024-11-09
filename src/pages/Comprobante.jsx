import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/images/logo-de.png';

const ComprobanteDePago = ({ idCliente }) => {
  const [paymentData, setPaymentData] = useState(null);
  const [logoDimensions, setLogoDimensions] = useState({ width: 0, height: 0 });
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_URL}/Prestamo/estado/${idCliente}`);
        const data = await response.json();
        if (response.ok) {
          setPaymentData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentData();
  }, [idCliente]);

  useEffect(() => {
    // Cargar la imagen y obtener sus dimensiones
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      const maxWidth = 50; // Ancho máximo deseado
      const scale = maxWidth / img.width; // Calcular la escala
      setLogoDimensions({
        width: maxWidth,
        height: img.height * scale // Mantener la proporción
      });
    };
  }, []);

  const generatePDF2 = () => {
    if (!paymentData) return;

    const doc = new jsPDF();

    // Agregar el logo con dimensiones proporcionales
    doc.addImage(logo, 'PNG', 10, 10, logoDimensions.width, logoDimensions.height);

    // Agregar título
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 255);
    doc.text('Comprobante de Pago', 90, 30);

    // Agregar información del cliente
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Cliente No.: ${paymentData.idCliente}`, 150, 20);
    doc.text(`Nombre: ${paymentData.nombre} ${paymentData.apellido}`, 20, 45);
    doc.text(`Dirección: ${paymentData.direccion}`, 20, 55);
    doc.text(`Teléfono: ${paymentData.telefono}`, 20, 65);
    doc.text(`Fecha de Registro: ${new Date(paymentData.fechaRegistro).toLocaleDateString()}`, 20, 75);
    doc.text(`Tasa de Interés: ${paymentData.tasaInteres}%`, 20, 85);
    doc.text(`Modalidad de Pago: ${paymentData.modalidadPago}`, 20, 95);
    doc.text(`Fecha de Registro del Préstamo: ${new Date(paymentData.fechaRegistroPrestamo).toLocaleDateString()}`, 20, 105);
    doc.text(`Número Total de Cuotas: ${paymentData.cuotas.length}`, 20, 115);

    // Agregar tabla de cuotas
    const cuotaRows = paymentData.cuotas.map(cuota => [
      `${cuota.numeroCuota}`,
      `Q.${cuota.montoCuota ? cuota.montoCuota.toFixed(2) : '0.00'}`,
      `Q.${cuota.interesCuota ? cuota.interesCuota.toFixed(2) : '0.00'}`,
      `Q.${cuota.moraCuota ? cuota.moraCuota.toFixed(2) : '0.00'}`,
      `Q.${cuota.totalCuota ? cuota.totalCuota.toFixed(2) : '0.00'}`,
      `Q.${paymentData.monto - paymentData.cuotas.reduce((total, cuota) => total + (cuota.totalCuota || 0), 0).toFixed(2)}`,
      cuota.estadoPago ? 'Pagado' : 'Pendiente',
    ]);

    doc.autoTable({
      head: [['Cuota No.', 'Abono', 'Intereses', 'Mora', 'Total a Pagar', 'Deuda Residual', 'Estado de Pago']],
      body: cuotaRows,
      startY: 130,
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
        6: { cellWidth: 35 },
      },
    });

    doc.save(`comprobante_de_pago_${paymentData.idCliente}.pdf`);
  };

  return (
    <div>
      <button onClick={generatePDF2}>Imprimir</button>
    </div>
  );
};

export default ComprobanteDePago;