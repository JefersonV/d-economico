import { useState } from "react";
const [data, setData] = useState([])

function UseFetch() {

  const getDataById = async (id, url) => {
    try {
      const response = await fetch(`${url}/${id}`,
        {
          headers: {
            // Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const usuarioData = await response.json();
      setData({
        ...data,
        nombre: usuarioData.nombre,
        idTipoUsuario: usuarioData.tipoUsuario,
      });
    } catch (error) {
      console.log("Error Message: " + error.ErrorMessage);
    }
  };
}
