import React from 'react'
import "../styles/Loader.scss"

function Loader() {
  return (
    <>
      <section className="dots-container">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </section>
    </>
  )
}

export default Loader