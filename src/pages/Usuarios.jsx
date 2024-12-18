import React, { useState, useEffect } from 'react'
import { useStore } from '../providers/GlobalProvider'
import TableUsers from '../components/usuarios/TableUsers';
import Searchbar from '../components/Searchbar';
// import ModalAddUser from "../components/usuarios/ModalAddUser";
import ModalAddUser from '../components/usuarios/ModalAddUser';
import { Button } from "reactstrap";
import { FcPrint } from "react-icons/fc";

function Users(props) {
  /* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
  const isOpen = useStore((state) => state.sidebar);
  useEffect(() => {
    // Para establecer en el módulo en el que nos encontramos
    props.setTitle("Control de Usuarios");
  }, []);
  
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [dataApi, setDataApi] = useState([]);
  const getData = async () => {
    try {
      // https://jsonplaceholder.typicode.com/comments
      const response = await fetch(`${backend_url}/Account`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setDataApi(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  /* ----- Buscador */
  // state para buscador
  const [search, setSearch] = useState("");
  // buscador, captura de datos
  const searcher = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
    console.log(e.target.value.length);
  };
  //metodo de filtrado del buscador
  // Si state search es null (no sea ha ingresado nada en el input) results = dataApi
  const results = !search
    ? dataApi
    : // Si se ha ingresado información al input, que la compare a los criterios y los filtre
      dataApi.filter((item) =>
        item.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );

  return (
    <div className={ isOpen ? "wrapper" : "side" }>
      <div className="container-fluid mt-4">
      <div className="row">
          <div className="col-6">
            <Searchbar searcher={searcher} placeholder="Nombre" />
          </div>
          <div className="col-6">
            <ModalAddUser actualizarListaUsuario={getData} />
            {/* <Button color="primary" outline>
              Imprimir lista
              <FcPrint />
            </Button> */}
          </div>
        </div>
        
      <TableUsers 
        data={results}
        actualizarListaUsuario={getData}
      />
      </div>
    </div>
  );
}

export default Users;
