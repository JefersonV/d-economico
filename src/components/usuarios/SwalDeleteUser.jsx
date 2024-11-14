import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { BsFillTrashFill } from 'react-icons/bs';

const SwalDelete = ({ idUsuario, actualizarListaUsuario }) => {
  const [tipoUsuario, setTipoUsuario] = useState('');

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getUsuarioData = async (id) => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/Account/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          'Content-Type': 'application/json'
        }
      });
      const usuarioData = await response.json();
      setTipoUsuario(usuarioData.tipoUsuario);
    } catch (error) {
      console.log('Error Message: ' + error.message);
    }
  };

  useEffect(() => {
    getUsuarioData(idUsuario);
  }, [idUsuario]);

  const providerDelete = async (id) => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/Account/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      if (response.ok) {
        actualizarListaUsuario();
      } else {
        Swal.fire('Error', 'No se pudo eliminar el registro', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Ocurrió un error al eliminar el registro', 'error');
    }
  };

  const deleteSweet = async () => {
    // Esperamos a que se cargue el tipo de usuario
    await getUsuarioData(idUsuario);
    if (tipoUsuario !== 'Administrador') {
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
          providerDelete(idUsuario);
          Swal.fire('Eliminado', 'El registro se ha eliminado', 'success');
        }
      });
    } else {
      Swal.fire('No se puede eliminar', 'Este usuario no puede ser eliminado', 'warning');
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

export default SwalDelete;