import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequisitosDocs = ({ idDocs }) => {
    const [requisitosDocs, setRequisitosDocs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageDpi, setImageDpi] = useState(null);
    const [imageRecibo, setImageRecibo] = useState(null);
    const [message, setMessage] = useState('');
    const [idRegistro, setIdRegistro] = useState(null);

    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchRequisitosDocs = async () => {
        try {
            const response = await fetch(`${VITE_BACKEND_URL}/Requisito/${idDocs}`);
            if (!response.ok) throw new Error('Error al obtener los datos');
            const data = await response.json();
            setRequisitosDocs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequisitosDocs();
    }, [idDocs]);

    const handleFileChange = (event, setImage) => {
        const file = event.target.files[0];

        if (file) {
            const maxSizeInBytes = 1.5 * 1024 * 1024;

            if (file.size > maxSizeInBytes) {
                toast.error('El archivo excede el tamaño máximo de 1.5 MB.'); // Notificación de error
                setImage(null);
            } else {
                setImage(file);
                toast.success('Archivo seleccionado correctamente.'); // Notificación de éxito
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (imageDpi) formData.append('imageDpi', imageDpi);
        if (imageRecibo) formData.append('imageRecibo', imageRecibo);

        try {
            let response;
            if (requisitosDocs) {
                // Si ya existen requisitos docs, hacemos un PUT
                response = await fetch(`${VITE_BACKEND_URL}/Requisito/${idDocs}`, {
                    method: 'PUT',
                    body: formData,
                });
            } else {
                // Si no existen, hacemos un POST
                response = await fetch(`${VITE_BACKEND_URL}/Requisito`, {
                    method: 'POST',
                    body: formData,
                });
            }

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: requisitosDocs ? 'Registro actualizado correctamente' : 'Registro agregado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                fetchRequisitosDocs();
                setMessage(data.message);
                setIdRegistro(data.id);
            } else {
                setMessage(data.message || 'Error al procesar la solicitud.');
            }
        } catch (error) {
            setMessage('Error en la conexión.');
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <ToastContainer />
            {!requisitosDocs ? (
                <div>
                    <h3>No se encontraron requisitos de documentos</h3>
                    <p>Por favor, suba las imágenes de los documentos requeridos.</p>
                </div>
            ) : (
                <div>
                    <h3>Detalles de Requisitos Docs</h3>
                    <form onSubmit={handleSubmit}>
                       
                        {message && <p>{message}</p>}
                        {idRegistro && <p>ID del registro: {idRegistro}</p>}
                        <div className="bordered my-3">
                            <label>Actualizar Imagen DPI:</label> <br />
                            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImageDpi)} />
                        </div>
                        {requisitosDocs?.imageDpi && (
                            <div>
                                <h5>Imagen DPI</h5>
                                <img src={`data:image/png;base64,${requisitosDocs.imageDpi}`} alt="DPI" style={{ maxWidth: '75%', height: 'auto' }} />
                            </div>
                        )}
                        
                        <div className='my-3'>
                            <label>Actualizar Imagen Recibo:</label> <br />
                            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImageRecibo)} />
                        </div>
                        <br />
                        {requisitosDocs?.imageRecibo && (
                            <div>
                                <h2>Imagen Recibo</h2>
                                <img src={`data:image/png;base64,${requisitosDocs.imageRecibo}`} alt="Recibo" style={{ maxWidth: '75%', height: 'auto' }} />
                            </div>
                        )}
                        <button className="btn btn-primary" type="submit">Actualizar imagen(es)</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default RequisitosDocs;