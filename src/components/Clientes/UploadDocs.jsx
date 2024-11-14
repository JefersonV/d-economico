import React, { useState } from 'react';
import Swal from 'sweetalert2';

const UploadDocs = ( {setDocsStep3} ) => {
    const [imageDpi, setImageDpi] = useState(null);
    const [imageRecibo, setImageRecibo] = useState(null);
    const [message, setMessage] = useState('');
    const [idRegistro, setIdRegistro] = useState(null); // Estado para almacenar el ID

    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleFileChange = (event, setImage) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('imageDpi', imageDpi);
        formData.append('imageRecibo', imageRecibo);

        try {
            const response = await fetch(`${VITE_BACKEND_URL}/Requisito`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registro agregado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                setMessage(data.message);
                // Almacenar el ID en el estado
                setIdRegistro(data.id); // Cambiado de response.data.id a data.id
            } else {
                setMessage(data.message || 'Error al subir las imágenes.');
            }
        } catch (error) {
            setMessage('Error en la conexión.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Imagen DPI:
                </label>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImageDpi)} required />
            </div>
            <div>
                <label>
                    Imagen Recibo:
                </label>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImageRecibo)} />
            </div>
            <br />
            <button className="btn btn-primary" type="submit">Adjuntar documentos</button>
            {message && <p>{message}</p>}
            {idRegistro && <p>ID del registro: {setDocsStep3(idRegistro)}</p>} {/* Muestra el ID del registro */}
        </form>
    );
};

export default UploadDocs;