import React, { useState } from 'react';

const UploadDocs = () => {
    const [dpi, setDpi] = useState('');
    const [imageDpi, setImageDpi] = useState(null);
    const [imageRecibo, setImageRecibo] = useState(null);
    const [noRecibo, setNoRecibo] = useState('');
    const [parentescoId, setParentescoId] = useState(0);
    const [message, setMessage] = useState('');

    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('dpi', dpi);
        formData.append('imageDpi', imageDpi);
        formData.append('imageRecibo', imageRecibo);
        formData.append('noRecibo', noRecibo);
        formData.append('parentescoId', parentescoId);

        try {
            const response = await fetch(`${VITE_BACKEND_URL}/Requisito`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
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
                    DPI:
                    <input type="text" value={dpi} onChange={(e) => setDpi(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>
                    Imagen DPI:
                    <input type="file" accept="image/*" onChange={(e) => setImageDpi(e.target.files[0])} required />
                </label>
            </div>
            <div>
                <label>
                    Imagen Recibo:
                    <input type="file" accept="image/*" onChange={(e) => setImageRecibo(e.target.files[0])} />
                </label>
            </div>
            <div>
                <label>
                    Número de Recibo:
                    <input type="text" value={noRecibo} onChange={(e) => setNoRecibo(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>
                    Parentesco:
                    <select value={parentescoId} onChange={(e) => setParentescoId(Number(e.target.value))} required>
                        <option value="0">Seleccione un parentesco</option>
                        <option value="1">Padre/Madre</option>
                        <option value="2">Hermano/Hermana</option>
                        <option value="3">Cónyuge</option>
                        <option value="4">Hijo/Hija</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </label>
            </div>
            <button className="btn btn-primary" type="submit">Registrar docs</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default UploadDocs;
