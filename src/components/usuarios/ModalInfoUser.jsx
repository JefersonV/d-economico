import React, { useState, useEffect } from 'react';
import { FaEye } from "react-icons/fa";

const ModalInfoUser = (props) => {

  return (
    <>
      <button >
        <FaEye  className="icon-action icon-action--delete" title="Ver informacion del usuario" size={22} />
      </button>
    </>
  );
};

export default ModalInfoUser;