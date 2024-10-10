import React from 'react'
import Searchbar from '../Searchbar'
import Badge from '@mui/icons-material/Badge'
import ModalAddFiador from './ModalAddFiador'

function CustomerStep2() {
  return (
    <>
      <div className="container-fluid justify-content-center m-auto">
        <div className="row">
          <div className="col-12 col-md-6">
            {/* Falta en onchange de los props*/}
            <Searchbar placeholder="nombre del cliente.."/>
          </div>
          <div className="col-12 col-md-6">
            <ModalAddFiador />
          </div>
          {/* Badge */}
          <Badge />
        </div>
      </div>
    </>
  )
}

export default CustomerStep2