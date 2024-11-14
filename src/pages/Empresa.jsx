import React, { useState, useEffect } from 'react';
import { useStore } from '../providers/GlobalProvider';
import BadgeEmpresa from '../components/Prestamos/BadgeEmpresa';
import Swal from 'sweetalert2';

const Empresa = (props) => {
    const isOpen = useStore((state) => state.sidebar);
    useEffect(() => {
      // Para establecer en el módulo en el que nos encontramos
      props.setTitle("Empresa");
    }, []);


    // get data de info empresa
    const [dataEmpresa, setDataEmpresa] = useState([]);	

    const getDataMicro = async () => {
        try {
            const response = await fetch(`${VITE_BACKEND_URL}/Empresa/1`);
            const data = await response.json();
            setDataEmpresa(data);
        } catch (error) {
            console.error(error);
        }
    }

    

    useEffect(() => {
      getDataMicro();
    }, [])

    useEffect(() => {
      console.info(dataEmpresa)

    }, [dataEmpresa])

    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono1, setTelefono1] = useState('');
    const [telefono2, setTelefono2] = useState('');
    const [message, setMessage] = useState('');

    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const empresaData = {
            nombreEmpresa,
            direccion,
            telefono1,
            telefono2,
        };

        try {
            const response = await fetch(`${VITE_BACKEND_URL}/Empresa/1`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empresaData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("actualizado correctamente");
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registro actualizado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                getDataMicro();
            } else {
                setMessage(data.message || 'Error al subir la información de la empresa.');
            }
        } catch (error) {
            setMessage('Error en la conexión.');
        }
    };

    return (
      <div className={isOpen ? "wrapper" : "side"}>

        <div className="container">
          <div className="row">
            <div className="col">
              <BadgeEmpresa dataEmpresa={dataEmpresa} />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>
                    Nombre de la Empresa:
                    <input
                      className="form-control"
                      type="text"
                      value={nombreEmpresa}
                      onChange={(e) => setNombreEmpresa(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Dirección:
                    <input
                      className="form-control"
                      type="text"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Teléfono 1:
                    <input
                      className="form-control"
                      type="text"
                      value={telefono1}
                      onChange={(e) => setTelefono1(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Teléfono 2:
                    <input
                      className="form-control"
                      type="text"
                      value={telefono2}
                      onChange={(e) => setTelefono2(e.target.value)}
                    />
                  </label>
                </div>
                <button type="submit">Enviar</button>
                {message && <p>{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Empresa;