import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { BsFillTrashFill } from 'react-icons/bs';

const SwalCliente = ({ idCliente, actualizarListaCliente }) => {

  const [data, setData] = useState({
    tipoUsuario: '',
  });

  
  const deleteSweet = () => {
    getUsuarioData(idCliente)
    if (data.tipoUsuario !== 'Administrador') { // Verificar si el usuario no es el administrador
      Swal.fire({
        title: 'Eliminar registro',
        text: '¿Estás seguro que quieres eliminar el registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimínalo',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Eliminado', 'El registro se ha eliminado', 'success');
          providerDelete(idCliente);
        }
      });
    } else {
      Swal.fire('No se puede eliminar', 'Este usuario no puede ser eliminado', 'warning');
    }
  };
  
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const getUsuarioData = async (id) => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Cliente/${id}`, {
        headers: {
          // Authorization: `Bearer ${localStorage.token}`,
          'Content-Type': 'application/json'
        }
      });
      const usuarioData = await response.json();
      setData({
        ...data,
        tipoUsuario: usuarioData.tipoUsuario,
      });
    } catch (error) {
      console.log('Error Message: ' + error.ErrorMessage);
    }
  };
  
  useEffect(() => {
    getUsuarioData(idCliente)
  }, []);

  // const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const providerDelete = async (id) => {
      try {
        const response = await fetch(`${VITE_BACKEND_URL}/Cliente/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        if (response.ok) {
          /* Prop para actualizar la tabla en tiempo real después de eliminar el registro */
          actualizarListaCliente();
        } else {
          Swal.fire('Error', 'No se pudo eliminar el registro', 'error');
        }
      } catch (error) {
        console.log(error);
        Swal.fire('Error', 'Ocurrió un error al eliminar el registro', 'error');
      }
  };

  return (
    <>
      <button onClick={deleteSweet}>
        <BsFillTrashFill className="icon-action icon-action--delete" title="Eliminar usuario" size={22} />
      </button>
    </>
  );
};

export default SwalCliente;
