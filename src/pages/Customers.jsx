import React, { useEffect } from 'react'
import { useStore } from '../providers/GlobalProvider'
import Searchbar from '../components/Searchbar';
import { Button, Pagination } from "reactstrap";
import { FaRegAddressCard } from "react-icons/fa";
import TableClient from '../components/Clientes/TableClient';
import PagComponent from '../components/PagComponent';
import { Link } from 'react-router-dom';

function Customers(props) {
  const isOpen = useStore((state) => state.sidebar);
	useEffect(() => {
		/* isOpen (globalstate) -> para que el contenido se ajuste según el ancho de la sidebar (navegación) */
		// Para establecer en el módulo en el que nos encontramos
		props.setTitle("Clientes");
	}, []);
  return (
    <>
      <div className={isOpen ? "wrapper" : "side"}>
        <div className="container">
          <div className="row justify-content-center mt-4">
            <div className="col-4">
              <Searchbar placeholder="criterios.."/>
            </div>
            <div className="col-4">
              <Link color="primary" to="/multiple">
                <FaRegAddressCard /> Agregar Cliente
              </Link>
            </div>

          </div>

          <div className="row">
            <div className="col">
              <TableClient />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col">
              <PagComponent />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Customers