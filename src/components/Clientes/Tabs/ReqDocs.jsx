import React, { useEffect, useState } from 'react';

const RequisitosDocs = ({ id }) => {
    const [requisitosDocs, setRequisitosDocs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const fetchRequisitosDocs = async () => {
            try {
                const response = await fetch(`${VITE_BACKEND_URL}/Requisito/1`); // Asegúrate de que la ruta sea correcta
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setRequisitosDocs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRequisitosDocs();
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.info(requisitosDocs);
    return (
        <div>
            <h1>Detalles de Requisitos Docs</h1>
            <p><strong>DPI:</strong> {requisitosDocs.dpi}</p>
            <p><strong>No Recibo:</strong> {requisitosDocs.noRecibo}</p>
            <p><strong>ID Parentesco:</strong> {requisitosDocs.parentescoIdParentesco}</p>
            <p><strong>Estado:</strong> {requisitosDocs.estado}</p>

            {requisitosDocs.imageDpi && (
                <div>
                    <h2>Imagen DPI</h2>
                    <img
                        src={`data:image/png;base64,${requisitosDocs.imageDpi}`}
                        alt="DPI"
                        style={{ maxWidth: '75%', height: 'auto' }}
                    />
                </div>
            )}

            {requisitosDocs.imageRecibo && (
                <div>
                    <h2>Imagen Recibo</h2>
                    <img
                        src={`data:image/png;base64,${requisitosDocs.imageRecibo}`}
                        alt="Recibo"
                        style={{ maxWidth: '75%', height: 'auto' }}
                    />
                </div>
            )}
        </div>
    );
};

export default RequisitosDocs;