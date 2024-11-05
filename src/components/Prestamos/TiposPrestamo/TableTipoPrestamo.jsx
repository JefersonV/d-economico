import React from 'react'
import { Table } from 'reactstrap'

function TableTipoPrestamo(props) {
  console.info(props.data)
  return (
    <>
      <Table hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Dias</th>
                </tr>
              </thead>
              <tbody>
                {props.data && props.data.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.tipoPrestamo1}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </Table>
    </>
  )
}

export default TableTipoPrestamo