import { jsPDF } from "jspdf";
import logo from "../assets/images/logo-de.png"; // Asegúrate de que la ruta sea correcta
import { FcPrint } from "react-icons/fc";
const generarPDF = () => {
  const doc = new jsPDF();

  // Configurar la fuente y el tamaño
  doc.setFont("Times", "normal"); // Cambia la fuente a Times New Roman
  doc.setFontSize(12); // Establecer el tamaño de la fuente

  // Márgenes
  const margin = 20; // Margen izquierdo
  const pageWidth = doc.internal.pageSize.getWidth(); // Ancho total de la página
  const textWidth = pageWidth - margin; // Ancho del texto, menos el margen izquierdo

  // Agregar el título "CONTRATO DE TRABAJO"
  const title = "CONTRATO DE TRABAJO";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2; // Calcular la posición X para centrar
  doc.setFontSize(16); // Ajustar el tamaño de la fuente para el título
  doc.text(title, titleX, 50); // Agregar el título en la posición centrada


  // Restablecer el tamaño de la fuente para el contenido del contrato
  doc.setFontSize(12); // Establecer el tamaño de la fuente para el contenido
  // Contrato de trabajo texto
  const contratoTrabajo = `CONTRATO DE TRABAJO

  Entre [Nombre del Empleado], con DNI [Número de DNI], y la empresa [Nombre de la Empresa], 
  con CIF [Número de CIF], se acuerda lo siguiente:

  1. **Objeto del Contrato**: El empleado prestará sus servicios como [Puesto de Trabajo] en la 
  sede de la empresa, ubicada en [Dirección de la Empresa].

  2. **Duración**: Este contrato tendrá una duración de [Tiempo], comenzando el [Fecha de Inicio] 
  y finalizando el [Fecha de Fin].

  3. **Jornada**: La jornada laboral será de [Número de Horas] horas semanales, distribuidas de 
  [Días de Trabajo].

  4. **Remuneración**: El salario será de [Cantidad] euros brutos mensuales, que se pagarán 
  [Frecuencia de Pago].

  5. **Obligaciones del Empleado**: El empleado se compromete a cumplir con las funciones 
  asignadas y a seguir las directrices de la empresa.

  6. **Confidencialidad**: El empleado se compromete a no divulgar información confidencial 
  de la empresa a terceros.

  7. **Terminación**: El contrato podrá ser rescindido por cualquiera de las partes con un 
  preaviso de [Número de Días] días.

  Firmado en [Lugar] a [Fecha].`;

  // Calcular el nuevo ancho del texto (15% más)
  const increasedWidth = textWidth * 1.15; // Aumentar el ancho en un 15%
  const textLines = doc.splitTextToSize(contratoTrabajo, increasedWidth); // Ajusta el ancho de la línea

  // Agregar el texto debajo de la imagen
  const startingY = 55; // Posición Y debajo de la imagen
  doc.text(textLines, margin, startingY); // Alineación a la izquierda con margen

  // Espaciado para las líneas de firma
  const lineSpacing = 20; // Espacio vertical entre las líneas de firma
  const signatureY = startingY + textLines.length * 5 + 20; // Posición Y para las líneas de firma, ajustada

  // Líneas de firma del lado izquierdo
  doc.line(margin, signatureY, pageWidth / 2 - margin, signatureY); // Línea para el empleado
  doc.text("[Nombre del Empleado]", margin, signatureY + 5); // Texto del empleado

  doc.line(margin, signatureY + lineSpacing + 10, pageWidth / 2 - margin, signatureY + lineSpacing + 10); // Línea para el representante
  doc.text("[Nombre del Representante de la Empresa]", margin, signatureY + lineSpacing + 15); // Texto del representante

  // Líneas de firma del lado derecho
  doc.line(pageWidth / 2 + margin, signatureY, pageWidth - margin, signatureY); // Línea adicional 1
  doc.text("[Firma Adicional 1]", pageWidth / 2 + margin, signatureY + 5); // Texto adicional 1

  doc.line(pageWidth / 2 + margin, signatureY + lineSpacing + 10, pageWidth - margin, signatureY + lineSpacing + 10); // Línea adicional 2
  doc.text("[Firma Adicional 2]", pageWidth / 2 + margin, signatureY + lineSpacing + 15); // Texto adicional 2

  // Calcular la posición de la imagen
  const imgWidth = 50; // Ancho deseado de la imagen
  const aspectRatio = 1.5; // Relación de aspecto de la imagen (ancho / alto)
  const imgHeight = imgWidth / aspectRatio; // Calcular la altura proporcional

  // Colocar la imagen a la derecha del texto
  const imgX = pageWidth - margin - imgWidth; // Posición X de la imagen
  doc.addImage(logo, 'PNG', imgX, 10, imgWidth, imgHeight); // Agregar la imagen en la posición calculada

  // nombre del archivo
  doc.save("contrato_trabajo.pdf");
};

function Document() {
  return (
    <>
      <button type="button" onClick={generarPDF}> <FcPrint size={25}/> </button>
    </>
  );
}

export default Document;