import React from 'react'
import Searchbar from '../Searchbar'
import ModalAddReferencia1 from './ModalAddReferencia1'
import Badge from './Badge'
import ModalDocs from './ModalDocs'

function CustomerStep3() {
  return (
    <>
      <div className="container-fluid justify-content-center m-auto">
        <div className="row d-flex justify-content-center">
          <div className="col">
            <h5 className="blue-txt m-0">Click para registrar una de las referencias</h5>
          </div>
          <div className="col">

            <ModalAddReferencia1 /> 
            <ModalDocs />
          </div>
        </div>
        
        <div className="row">
          <div className="col-12 col-md-6">
            {/* Falta en onchange de los props*/}
            <h5 className="blue-txt">Referencia Familiar</h5>
            <Searchbar placeholder="nombre de la persona de referencia.."/>
            <h5 className="blue-txt">Referencia Personal</h5>
            <Searchbar placeholder="nombre de la persona de referencia.."/>
          </div>
          <div className="col-12 col-md-6 ">
            <Badge />
            <Badge />
          </div>
          {/* Badge */}
          {/* <Badge /> */}
        </div>

        <div className="row">
          <div className="col-6">
            {/* Falta en onchange de los props*/}
            
          </div>
          {/* <div className="col-6">
            <ModalAddReferencia1 />
          </div> */}
          {/* Badge */}
          {/* <Badge /> */}
        </div>
      </div>
    </>
  )
}

export default CustomerStep3